import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  Download, 
  MessageSquare,
  Users,
  Building2,
  Trash2,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Job, SavedCandidate, ScheduledInterview, InterviewFeedback } from '../types';

interface EmployerRecruiterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  savedCandidates: SavedCandidate[];
  onToggleSaveCandidate: (candidate: SavedCandidate) => void;
  onUpdateCandidateNote?: (candidateId: string, note: string) => void;
  onScheduleCandidateInterview?: (candidate: SavedCandidate) => void;
  onToast?: (message: string) => void;
  feedbackList?: InterviewFeedback[];
  onToggleReviewFeedback?: (feedbackId: string) => void;
}

// Sample talent pool candidates with Verified Skills
export const SAMPLE_TALENT_POOL: SavedCandidate[] = [
  {
    id: 'cand-1',
    candidateName: 'Adaeze Okonkwo (CIPM, SHRM-SCP)',
    email: 'adaeze.okonkwo@talentleader.org',
    phone: '+234 812 345 6789',
    currentRole: 'Senior HR Business Partner & People Operations Lead',
    experienceYears: '7+ years',
    location: 'Lagos, Nigeria (Hybrid / Remote)',
    extractedSkills: ['Strategic Workforce Planning', 'Nigerian Labour Act Compliance', 'Performance Management', 'CIPM Member', 'Executive Talent Acquisition'],
    verifiedSkills: [
      { name: 'Nigerian Labour Act Compliance', verifiedAt: 'Verified Assessment', score: 98, type: 'assessment' },
      { name: 'Strategic Workforce Planning', verifiedAt: 'CIPM Credentials', type: 'certification', certName: 'CIPM Chartered Member', issuer: 'CIPM' },
      { name: 'Performance Management', verifiedAt: 'SHRM-SCP', type: 'certification', certName: 'SHRM-SCP', issuer: 'SHRM' }
    ],
    certifications: ['CIPM Chartered Member', 'SHRM-SCP'],
    notes: 'Exceptional HRBP background with proven labor union mediation and Pan-African scale.',
    savedAt: '2 days ago',
    sourceJobTitle: 'Senior HR Business Partner',
    matchScore: 97,
    avatarColor: 'bg-lime-600'
  },
  {
    id: 'cand-2',
    candidateName: 'Tunde Adeleke (AWS & CKA Certified)',
    email: 'tunde.adeleke.dev@gmail.com',
    phone: '+234 803 789 4521',
    currentRole: 'Senior Backend & Distributed Systems Architect',
    experienceYears: '6+ years',
    location: 'Lagos, Nigeria (Remote)',
    extractedSkills: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Docker & Kubernetes', 'Kafka', 'Payment Gateways'],
    verifiedSkills: [
      { name: 'TypeScript', verifiedAt: 'Verified Assessment', score: 96, type: 'assessment' },
      { name: 'PostgreSQL', verifiedAt: 'Verified Assessment', score: 92, type: 'assessment' },
      { name: 'Docker & Kubernetes', verifiedAt: 'CKA Certified', type: 'certification', certName: 'CKA', issuer: 'CNCF' }
    ],
    certifications: ['AWS Certified Solutions Architect - Professional', 'Certified Kubernetes Administrator (CKA)'],
    notes: 'Engineered high-throughput payment reconciliation systems at Paystack & Interswitch.',
    savedAt: 'Yesterday',
    sourceJobTitle: 'Lead Software Engineer (Fintech)',
    matchScore: 99,
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'cand-3',
    candidateName: 'Chukwudi Nwachukwu (CSPO)',
    email: 'c.nwachukwu.pm@outlook.com',
    phone: '+234 802 987 6543',
    currentRole: 'Lead Product Growth & Monetization Strategist',
    experienceYears: '5+ years',
    location: 'Nairobi, Kenya / Remote',
    extractedSkills: ['Product Strategy & Vision', 'User Journey Mapping', 'A/B Testing', 'SQL Analytics', 'Fintech Product Operations'],
    verifiedSkills: [
      { name: 'Product Strategy & Vision', verifiedAt: 'Verified Assessment', score: 94, type: 'assessment' },
      { name: 'A/B Testing & Funnel Optimization', verifiedAt: 'Verified Assessment', score: 91, type: 'assessment' }
    ],
    certifications: ['Certified Scrum Product Owner (CSPO)', 'Reforge Growth Series'],
    notes: 'Grew active users from 0 to 1M+ at Moniepoint. Strong commercial product instincts.',
    savedAt: '3 days ago',
    sourceJobTitle: 'Head of Digital Products',
    matchScore: 94,
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'cand-4',
    candidateName: 'Fatima Al-Mansoor',
    email: 'f.almansoor@financeadvisors.ng',
    phone: '+234 815 444 3322',
    currentRole: 'Financial Controller & Treasury Operations Lead',
    experienceYears: '8+ years',
    location: 'Abuja, Nigeria (On-Site / Hybrid)',
    extractedSkills: ['Financial Modeling', 'Regulatory Compliance (CBN)', 'Liquidity & Risk Management', 'IFRS Standards', 'Treasury Operations'],
    verifiedSkills: [
      { name: 'Financial Modeling', verifiedAt: 'Verified Assessment', score: 97, type: 'assessment' },
      { name: 'Regulatory Compliance (CBN)', verifiedAt: 'Verified Assessment', score: 95, type: 'assessment' }
    ],
    certifications: ['ICAN Chartered Accountant', 'CFA Level II'],
    notes: 'Managed $40M treasury portfolio with multi-currency hedging strategies.',
    savedAt: 'Just now',
    sourceJobTitle: 'Treasury & FP&A Director',
    matchScore: 95,
    avatarColor: 'bg-amber-600'
  }
];

export const EmployerRecruiterDashboardModal: React.FC<EmployerRecruiterDashboardModalProps> = ({
  isOpen,
  onClose,
  jobs,
  savedCandidates,
  onToggleSaveCandidate,
  onUpdateCandidateNote,
  onScheduleCandidateInterview,
  onToast,
  feedbackList = [],
  onToggleReviewFeedback
}) => {
  const [activeTab, setActiveTab] = useState<'saved-candidates' | 'talent-search' | 'job-postings' | 'candidate-feedback'>('saved-candidates');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedFilterOnly, setVerifiedFilterOnly] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const isCandidateSaved = (candId: string) => {
    return savedCandidates.some(c => c.id === candId);
  };

  // Filtered pool for talent search
  const filteredTalentPool = SAMPLE_TALENT_POOL.filter(cand => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = cand.candidateName.toLowerCase().includes(q) ||
        cand.currentRole.toLowerCase().includes(q) ||
        cand.extractedSkills.some(s => s.toLowerCase().includes(q)) ||
        cand.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (verifiedFilterOnly && cand.verifiedSkills.length === 0) {
      return false;
    }
    return true;
  });

  // Filtered saved candidates list
  const filteredSavedCandidates = savedCandidates.filter(cand => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return cand.candidateName.toLowerCase().includes(q) ||
      cand.currentRole.toLowerCase().includes(q) ||
      cand.extractedSkills.some(s => s.toLowerCase().includes(q)) ||
      (cand.notes && cand.notes.toLowerCase().includes(q));
  });

  const handleExportCsv = () => {
    if (savedCandidates.length === 0) return;
    const rows = [
      ['Name', 'Current Role', 'Experience', 'Email', 'Phone', 'Location', 'Verified Skills Count', 'Notes'],
      ...savedCandidates.map(c => [
        `"${c.candidateName}"`,
        `"${c.currentRole}"`,
        `"${c.experienceYears}"`,
        `"${c.email}"`,
        `"${c.phone || ''}"`,
        `"${c.location}"`,
        c.verifiedSkills.length,
        `"${c.notes || ''}"`
      ])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'nextsofthr_saved_candidates_shortlist.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast('Exported saved candidates shortlist to CSV!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs overflow-y-auto transition-colors duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-4 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#142B4A] dark:bg-[#070e1b] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Employer & Recruiter Portal
                </h2>
                <span className="text-[10px] bg-lime-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                  Talent Sourcing Engine
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage talent pipelines, evaluate verified badges, and bookmark candidates.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            {/* SAVED CANDIDATES TAB (Requirement 7) */}
            <button
              type="button"
              onClick={() => setActiveTab('saved-candidates')}
              className={`px-3.5 py-2 font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'saved-candidates'
                  ? 'bg-lime-500 text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Candidates</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === 'saved-candidates' ? 'bg-slate-950 text-white' : 'bg-lime-100 text-lime-900'
              }`}>
                {savedCandidates.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('talent-search')}
              className={`px-3.5 py-2 font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'talent-search'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Talent Search Pool</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('job-postings')}
              className={`px-3.5 py-2 font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'job-postings'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Active Vacancies ({jobs.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('candidate-feedback')}
              className={`px-3.5 py-2 font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'candidate-feedback'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Candidate Experience Insights</span>
              <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                activeTab === 'candidate-feedback' ? 'bg-slate-950 text-white' : 'bg-emerald-100 text-emerald-900'
              }`}>
                {feedbackList.length}
              </span>
            </button>
          </div>

          {activeTab === 'saved-candidates' && savedCandidates.length > 0 && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-lime-600" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB: SAVED CANDIDATES (Requirement 7) */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'saved-candidates' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#142B4A] dark:text-white flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-lime-600 dark:text-lime-400" />
                    <span>Bookmarked & Saved Candidate Shortlist ({savedCandidates.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Review interesting talent bookmarked from search results, add internal recruiter notes, or initiate interview scheduling.
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search saved candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>
              </div>

              {filteredSavedCandidates.length === 0 ? (
                <div className="p-10 text-center rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-lime-100 dark:bg-lime-950/60 text-lime-700 dark:text-lime-400 flex items-center justify-center mx-auto">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">
                    No Saved Candidates Yet
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Browse the Talent Search Pool tab and click the bookmark star on candidate profiles to save them to your active recruiting shortlist.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('talent-search')}
                    className="px-4 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Browse Talent Search Pool
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredSavedCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-lime-400/60 dark:hover:border-lime-500/40 transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div className={`w-11 h-11 rounded-2xl ${cand.avatarColor || 'bg-lime-600'} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                            {cand.candidateName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                                {cand.candidateName}
                              </h4>
                              {cand.matchScore && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
                                  {cand.matchScore}% Match
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {cand.currentRole}
                            </p>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3 pt-0.5">
                              <span>⏳ {cand.experienceYears}</span>
                              <span>📍 {cand.location}</span>
                              <span>✉️ {cand.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (onScheduleCandidateInterview) onScheduleCandidateInterview(cand);
                              else if (onToast) onToast(`Invited ${cand.candidateName} to interview!`);
                            }}
                            className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Schedule Interview</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onToggleSaveCandidate(cand)}
                            className="p-2 rounded-xl bg-lime-50 hover:bg-red-50 text-lime-700 hover:text-red-600 border border-lime-300 dark:border-lime-800 transition-colors cursor-pointer"
                            title="Remove candidate from saved list"
                          >
                            <BookmarkCheck className="w-4 h-4 text-lime-600 hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      {/* Verified Skills & Certifications Badges */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {cand.verifiedSkills.map((vs, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-lime-50 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800 flex items-center gap-1"
                              title={`${vs.name}: ${vs.verifiedAt}`}
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                              <span>{vs.name}</span>
                              {vs.score && <span className="text-[9px] opacity-80">({vs.score}%)</span>}
                            </span>
                          ))}
                          {cand.extractedSkills.filter(s => !cand.verifiedSkills.some(v => v.name === s)).slice(0, 4).map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recruiter Notes Block */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                            <span>Internal Recruiter Notes:</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (editingNoteId === cand.id) {
                                if (onUpdateCandidateNote) onUpdateCandidateNote(cand.id, noteText);
                                setEditingNoteId(null);
                              } else {
                                setEditingNoteId(cand.id);
                                setNoteText(cand.notes || '');
                              }
                            }}
                            className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                          >
                            {editingNoteId === cand.id ? 'Save Note' : 'Edit Note'}
                          </button>
                        </div>

                        {editingNoteId === cand.id ? (
                          <div className="space-y-1.5">
                            <textarea
                              rows={2}
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs"
                              placeholder="Add feedback, screening notes, or interview impression..."
                            />
                          </div>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-300 italic text-[11px]">
                            {cand.notes || 'No internal notes added yet. Click "Edit Note" to add notes for your team.'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: TALENT SEARCH POOL */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'talent-search' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Search & Filters */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by candidate name, role, technology (e.g. TypeScript, CIPM, Go, AWS)..."
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 shrink-0">
                  <input
                    type="checkbox"
                    checked={verifiedFilterOnly}
                    onChange={(e) => setVerifiedFilterOnly(e.target.checked)}
                    className="rounded border-slate-300 accent-lime-600"
                  />
                  <span>Verified Skills Badges Only</span>
                </label>
              </div>

              {/* Talent Pool Cards */}
              <div className="space-y-3">
                {filteredTalentPool.map((cand) => {
                  const saved = isCandidateSaved(cand.id);

                  return (
                    <div
                      key={cand.id}
                      className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`w-11 h-11 rounded-2xl ${cand.avatarColor || 'bg-lime-600'} text-white font-black text-sm flex items-center justify-center shrink-0`}>
                          {cand.candidateName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {cand.candidateName}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
                              {cand.matchScore}% Fit
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {cand.currentRole}
                          </p>
                          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-3">
                            <span>⏳ {cand.experienceYears}</span>
                            <span>📍 {cand.location}</span>
                          </div>

                          {/* Verified Skills */}
                          <div className="flex flex-wrap gap-1 pt-1.5">
                            {cand.verifiedSkills.map((vs, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-lime-50 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800 flex items-center gap-1"
                              >
                                <ShieldCheck className="w-3 h-3 text-lime-600 dark:text-lime-400" />
                                <span>{vs.name}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bookmark & Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onToggleSaveCandidate(cand);
                            if (onToast) {
                              onToast(saved ? `Removed ${cand.candidateName} from saved candidates.` : `⭐ Bookmarked ${cand.candidateName} to Saved Candidates tab!`);
                            }
                          }}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            saved
                              ? 'bg-lime-500 text-slate-950 shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-lime-50 hover:text-lime-900 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          <span>{saved ? 'Saved' : 'Bookmark'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (onScheduleCandidateInterview) onScheduleCandidateInterview(cand);
                            else if (onToast) onToast(`Invited ${cand.candidateName} to interview!`);
                          }}
                          className="px-3.5 py-2 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Interview</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: JOB POSTINGS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'job-postings' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-[#142B4A] dark:text-white">
                  Corporate Active Vacancies & Candidate Pipelines
                </h3>
                <span className="text-xs text-slate-500">{jobs.length} Published Openings</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jobs.slice(0, 6).map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {job.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                        {job.applicantCount || 0} Applicants
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {job.companyName} · {job.location} · {job.salaryRange}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-slate-400">Department: {job.department}</span>
                      <span className="font-bold text-lime-700 dark:text-lime-400">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
