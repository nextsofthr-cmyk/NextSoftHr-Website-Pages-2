import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Bookmark, 
  ExternalLink,
  Send,
  Zap,
  Clock,
  ShieldCheck,
  Check,
  TrendingUp,
  DollarSign,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { 
  Job, 
  CandidateApplication, 
  ParsedResumeProfile, 
  ScheduledInterview,
  InterviewStatus,
  InterviewFeedback
} from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { parseResumeWithMockNlp, SAMPLE_RESUMES, generateTailoredCoverNote } from '../utils/resumeParser';
import { ResumeScoreCard } from './ResumeScoreCard';
import { VerifySkillsSection } from './VerifySkillsSection';
import { InterviewCalendarView } from './InterviewCalendarView';
import { SalaryNegotiationSimulator } from './SalaryNegotiationSimulator';
import { InterviewPrepSection } from './InterviewPrepSection';
import { InterviewFeedbackSection } from './InterviewFeedbackSection';

interface CandidateDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  submittedApplications: CandidateApplication[];
  onApplySubmit: (application: CandidateApplication) => void;
  parsedProfile: ParsedResumeProfile | null;
  onSaveParsedProfile: (profile: ParsedResumeProfile) => void;
  onSelectJob: (job: Job) => void;
  onToast?: (message: string) => void;
  interviews?: ScheduledInterview[];
  onUpdateInterviewStatus?: (interviewId: string, status: InterviewStatus, confirmedSlotId?: string, notes?: string, candidateRescheduleSlots?: any[]) => void;
  feedbackList?: InterviewFeedback[];
  onSubmitFeedback?: (feedback: InterviewFeedback) => void;
}

export const CandidateDashboardModal: React.FC<CandidateDashboardModalProps> = ({
  isOpen,
  onClose,
  jobs,
  submittedApplications,
  onApplySubmit,
  parsedProfile,
  onSaveParsedProfile,
  onSelectJob,
  onToast,
  interviews = [],
  onUpdateInterviewStatus,
  feedbackList = [],
  onSubmitFeedback
}) => {
  const { convertAndFormatSalary } = useCurrency();
  const [activeTab, setActiveTab] = useState<
    'nlp-parser' | 'resume-score' | 'verify-skills' | 'interview-calendar' | 'interview-feedback' | 'salary-simulator' | 'interview-prep' | 'apply-form' | 'applications'
  >('nlp-parser');
  
  // NLP Parsing State
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStep, setParsingStep] = useState('');
  const [parsingPercent, setParsingPercent] = useState(0);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Pre-filled Application Form State
  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || '');
  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const [formName, setFormName] = useState(parsedProfile?.fullName || 'Adaeze Okonkwo');
  const [formEmail, setFormEmail] = useState(parsedProfile?.email || 'adaeze.okonkwo@talentleader.org');
  const [formPhone, setFormPhone] = useState(parsedProfile?.phone || '+234 812 345 6789');
  const [formRole, setFormRole] = useState(parsedProfile?.currentRole || 'Senior HR Business Partner & People Operations Lead');
  const [formExperience, setFormExperience] = useState(parsedProfile?.yearsOfExperience || '7+ years');
  const [formCoverNote, setFormCoverNote] = useState('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle local file upload with Mock NLP parser
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsParsing(true);
      try {
        const parsed = await parseResumeWithMockNlp(file, (step, percent) => {
          setParsingStep(step);
          setParsingPercent(percent);
        });

        onSaveParsedProfile(parsed);
        // Pre-fill form fields
        setFormName(parsed.fullName);
        setFormEmail(parsed.email);
        setFormPhone(parsed.phone);
        setFormRole(parsed.currentRole);
        setFormExperience(parsed.yearsOfExperience);
        if (selectedJob) {
          setFormCoverNote(generateTailoredCoverNote(parsed, selectedJob.title, selectedJob.companyName));
        }

        if (onToast) {
          onToast(`⚡ NLP Engine successfully extracted ${parsed.extractedSkills.length} skills & experience from "${file.name}"!`);
        }
      } catch {
        if (onToast) onToast('Failed to parse resume document.');
      } finally {
        setIsParsing(false);
      }
    }
  };

  // 1-Click Load Sample Profile
  const handleLoadSample = (sampleKey: keyof typeof SAMPLE_RESUMES) => {
    const sample = SAMPLE_RESUMES[sampleKey];
    if (!sample) return;

    setIsParsing(true);
    setParsingStep('Initializing NextSoft NLP Named Entity Extraction...');
    setParsingPercent(35);

    setTimeout(() => {
      setParsingStep('Matching skills taxonomies and experience chronology...');
      setParsingPercent(75);

      setTimeout(() => {
        setParsingStep('Schema verified and pre-filling ready!');
        setParsingPercent(100);

        onSaveParsedProfile(sample);
        setFormName(sample.fullName);
        setFormEmail(sample.email);
        setFormPhone(sample.phone);
        setFormRole(sample.currentRole);
        setFormExperience(sample.yearsOfExperience);
        if (selectedJob) {
          setFormCoverNote(generateTailoredCoverNote(sample, selectedJob.title, selectedJob.companyName));
        }
        setIsParsing(false);

        if (onToast) {
          onToast(`Loaded & parsed sample resume: ${sample.fullName} (${sample.currentRole})`);
        }
      }, 350);
    }, 400);
  };

  // Add / Remove Skill
  const handleAddSkill = () => {
    if (!newSkillInput.trim() || !parsedProfile) return;
    const updated = {
      ...parsedProfile,
      extractedSkills: [...parsedProfile.extractedSkills, newSkillInput.trim()]
    };
    onSaveParsedProfile(updated);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!parsedProfile) return;
    const updated = {
      ...parsedProfile,
      extractedSkills: parsedProfile.extractedSkills.filter(s => s !== skillToRemove)
    };
    onSaveParsedProfile(updated);
  };

  // Change Target Job & re-tailor cover note
  const handleTargetJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
    const target = jobs.find(j => j.id === jobId);
    if (target && parsedProfile) {
      setFormCoverNote(generateTailoredCoverNote(parsedProfile, target.title, target.companyName));
    }
  };

  // Handle Form Submission
  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const newApp: CandidateApplication = {
      jobId: selectedJob.id,
      fullName: formName,
      email: formEmail,
      phone: formPhone,
      currentRole: formRole,
      yearsOfExperience: formExperience,
      extractedSkills: parsedProfile?.extractedSkills || [],
      coverNote: formCoverNote || `Application for ${selectedJob.title} by ${formName}.`,
      cvFileName: parsedProfile?.fileName || 'Extracted_Candidate_Resume.pdf',
      appliedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onApplySubmit(newApp);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setActiveTab('applications');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#142B4A] dark:text-white">
                  Candidate Dashboard & Resume NLP
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#2563EB] dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
                  AI Auto-Fill
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extract skills & experience from any resume PDF to automatically pre-fill job applications.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1 sm:gap-3 overflow-x-auto shrink-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('nlp-parser')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'nlp-parser'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Resume NLP Parser</span>
            {parsedProfile && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('resume-score')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'resume-score'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>Resume Score & ATS</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300">
              Benchmark
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('verify-skills')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'verify-skills'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>Verify Skills Badges</span>
            {parsedProfile?.verifiedSkills && parsedProfile.verifiedSkills.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-lime-500 text-slate-950">
                {parsedProfile.verifiedSkills.length} Badged
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview-calendar')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'interview-calendar'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <span>Interview Calendar</span>
            {interviews.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {interviews.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview-feedback')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'interview-feedback'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Interview Feedback</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              Anonymous
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('salary-simulator')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'salary-simulator'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4 text-lime-600 dark:text-lime-400" />
            <span>Salary Negotiator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('interview-prep')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'interview-prep'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Interview Prep</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('apply-form');
              if (selectedJob && parsedProfile && !formCoverNote) {
                setFormCoverNote(generateTailoredCoverNote(parsedProfile, selectedJob.title, selectedJob.companyName));
              }
            }}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'apply-form'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Auto-Filled Form</span>
            {parsedProfile && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300">
                Ready
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`py-3.5 border-b-2 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'applications'
                ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Applications ({submittedApplications.length})</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: NLP RESUME PARSER */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'nlp-parser' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Upload Dropzone */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/60 via-indigo-50/30 to-teal-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-2 border-dashed border-blue-300 dark:border-blue-800 flex flex-col items-center justify-center text-center space-y-4">
                
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-[#2563EB] dark:text-blue-400 shadow-sm flex items-center justify-center">
                  {isParsing ? (
                    <Sparkles className="w-7 h-7 animate-spin text-[#2563EB] dark:text-blue-400" />
                  ) : (
                    <UploadCloud className="w-7 h-7" />
                  )}
                </div>

                <div className="max-w-md space-y-1">
                  <h3 className="font-extrabold text-base text-[#142B4A] dark:text-white">
                    {isParsing ? 'Processing Resume with Mock NLP Parser...' : 'Upload Resume PDF to Extract Skills & Experience'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Our mock NLP engine parses contact information, extracts named entity skills, determines experience tenure, and auto-fills applications automatically.
                  </p>
                </div>

                {/* Parsing Progress Bar */}
                {isParsing && (
                  <div className="w-full max-w-md space-y-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-xs animate-in fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        {parsingStep}
                      </span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{parsingPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#2563EB] h-full transition-all duration-300 rounded-full"
                        style={{ width: `${parsingPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <label className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer">
                    <FileText className="w-4 h-4" />
                    <span>Select Resume (PDF, DOCX)</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isParsing}
                    />
                  </label>

                  <span className="text-xs text-slate-400">or try 1-click presets below</span>
                </div>

                {/* 1-Click Sample Resumes */}
                <div className="pt-2 border-t border-blue-200/60 dark:border-slate-800 w-full max-w-2xl">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                    Quick-Test Sample Candidate Resumes (Instant Mock NLP Parsing):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleLoadSample('software_engineer')}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left transition-all group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-600">
                        <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">Tunde Adeleke</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                        Senior Software Engineer
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLoadSample('hr_director')}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left transition-all group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-600">
                        <FileText className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 shrink-0" />
                        <span className="truncate">Adaeze Okonkwo</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                        Senior HRBP & People Lead
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLoadSample('product_manager')}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left transition-all group cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white group-hover:text-blue-600">
                        <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">Chukwudi Nwachukwu</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                        Product Growth Lead
                      </span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Parsed Resume Profile Results */}
              {parsedProfile && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xs animate-in fade-in">
                  
                  {/* Top Bar with Confidence Match */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-extrabold text-[#142B4A] dark:text-white">
                          {parsedProfile.fullName}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-50 dark:bg-lime-950/60 text-lime-800 dark:text-lime-300 border border-lime-200 dark:border-lime-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{parsedProfile.confidenceScore}% NLP Confidence</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                        {parsedProfile.currentRole} · {parsedProfile.yearsOfExperience}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
                        📄 {parsedProfile.fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('apply-form');
                          if (selectedJob) {
                            setFormCoverNote(generateTailoredCoverNote(parsedProfile, selectedJob.title, selectedJob.companyName));
                          }
                        }}
                        className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Pre-fill Job Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Contact & Demographics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-slate-400 block uppercase">Extracted Email</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                          {parsedProfile.email}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-lime-600 dark:text-lime-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Extracted Phone</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {parsedProfile.phone}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-slate-400 block uppercase">Education Credential</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                          {parsedProfile.education}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Extracted Skills Chips with Add / Remove */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                        Extracted Skills ({parsedProfile.extractedSkills.length} Identified):
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Keywords parsed from document taxonomy
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {parsedProfile.extractedSkills.map((skill) => {
                        const isVerified = parsedProfile.verifiedSkills?.some(v => v.name.toLowerCase() === skill.toLowerCase());
                        return (
                          <span 
                            key={skill}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs group ${
                              isVerified
                                ? 'bg-lime-50 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300 border border-lime-300 dark:border-lime-800'
                                : 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60'
                            }`}
                          >
                            {isVerified && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-lime-700 dark:text-lime-400" title="Verified Skill">
                                <ShieldCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                              </span>
                            )}
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-slate-400 hover:text-red-500 cursor-pointer"
                              title="Remove skill"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}

                      {/* Add Extra Skill */}
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={newSkillInput}
                          onChange={(e) => setNewSkillInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                          placeholder="+ Add custom skill..."
                          className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-36"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  {parsedProfile.summary && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Synthesized Professional Summary
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {parsedProfile.summary}
                      </p>
                    </div>
                  )}

                  {/* Action Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 dark:from-slate-850 dark:via-emerald-950/20 dark:to-slate-850 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          Ready for 1-Click Application Pre-filling
                        </h5>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          Your parsed skills, experience, and contact data are ready to automatically populate any job application across NextSoftHR.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('apply-form');
                        if (selectedJob) {
                          setFormCoverNote(generateTailoredCoverNote(parsedProfile, selectedJob.title, selectedJob.companyName));
                        }
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer"
                    >
                      Pre-fill Application Form Now &rarr;
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: RESUME SCORE & ATS BENCHMARK */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'resume-score' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <ResumeScoreCard
                parsedProfile={parsedProfile}
                targetJob={selectedJob}
                onApplySkillSuggestion={(skill) => {
                  if (parsedProfile) {
                    const existing = parsedProfile.extractedSkills || [];
                    if (!existing.includes(skill)) {
                      const updated = { ...parsedProfile, extractedSkills: [...existing, skill] };
                      onSaveParsedProfile(updated);
                      if (onToast) onToast(`Added "${skill}" to your candidate profile!`);
                    }
                  }
                }}
              />
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: VERIFIED SKILLS BADGES & CERTIFICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'verify-skills' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <VerifySkillsSection
                parsedProfile={parsedProfile}
                onUpdateProfile={(updated) => onSaveParsedProfile(updated)}
                onToast={onToast}
              />
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: INTERVIEW CALENDAR & 1-HOUR ALERTS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'interview-calendar' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <InterviewCalendarView
                interviews={interviews}
                onTriggerOneHourAlert={(inv) => {
                  if (onToast) onToast(`⏰ Interview Alert: Session with ${inv.companyName} starts in 1 hour!`);
                }}
                onSelectInterviewJob={(jobId) => {
                  const found = jobs.find(j => j.id === jobId);
                  if (found) {
                    onClose();
                    onSelectJob(found);
                  }
                }}
                onRequestReschedule={(invId, slots, reason) => {
                  if (onUpdateInterviewStatus) {
                    onUpdateInterviewStatus(invId, 'rescheduled', undefined, `Candidate requested reschedule: ${reason}`, slots);
                  }
                }}
                onToast={onToast}
              />
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: INTERVIEW FEEDBACK & ANONYMOUS REVIEWS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'interview-feedback' && (
            <InterviewFeedbackSection
              jobs={jobs}
              interviews={interviews}
              feedbackList={feedbackList}
              onSubmitFeedback={(feedback) => {
                if (onSubmitFeedback) {
                  onSubmitFeedback(feedback);
                }
              }}
              candidateDefaultName={formName || parsedProfile?.fullName || 'Adaeze Okonkwo'}
              onToast={onToast}
            />
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: AI SALARY NEGOTIATION SIMULATOR */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'salary-simulator' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <SalaryNegotiationSimulator
                parsedProfile={parsedProfile}
                jobs={jobs}
                selectedJobId={selectedJobId}
                onToast={onToast}
              />
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: INTERVIEW PREP & COMMON QUESTIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'interview-prep' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <InterviewPrepSection
                parsedProfile={parsedProfile}
                targetJob={selectedJob}
                onToast={onToast}
              />
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB: PRE-FILLED APPLICATION FORM */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'apply-form' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Target Job Selector Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#142B4A] dark:text-white block">
                      Select Target Position to Apply for:
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Form is automatically pre-filled using your parsed resume NLP data.
                    </span>
                  </div>

                  <select
                    value={selectedJobId}
                    onChange={(e) => handleTargetJobChange(e.target.value)}
                    className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.title} · {j.companyName} ({convertAndFormatSalary(j.salaryRange, j.currency)})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedJob && (
                  <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#142B4A] text-white flex items-center justify-center font-bold text-xs">
                        {selectedJob.companyInitials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white">{selectedJob.title}</span>
                        <span className="text-slate-500 dark:text-slate-400 block text-[11px]">{selectedJob.companyName} · {selectedJob.location} ({selectedJob.workArrangement})</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#2563EB] dark:text-blue-400">{convertAndFormatSalary(selectedJob.salaryRange, selectedJob.currency)}</span>
                  </div>
                )}
              </div>

              {/* Pre-filled Form Body */}
              {isSubmittedSuccess ? (
                <div className="p-8 text-center rounded-2xl bg-lime-50 dark:bg-lime-950/40 border border-lime-200 dark:border-lime-800 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-lime-100 dark:bg-lime-900/60 text-lime-700 dark:text-lime-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Application Successfully Submitted!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your pre-filled profile, verified skills, and resume have been dispatched to the recruitment team at <strong>{selectedJob?.companyName}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplicationSubmit} className="space-y-4 text-xs">
                  
                  {/* NLP Auto-fill verification banner */}
                  <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between text-blue-900 dark:text-blue-300">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-xs">
                        Fields below automatically populated by Mock NLP Resume Parser.
                      </span>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700">
                      ⚡ 100% Pre-filled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Job Title</label>
                      <input
                        type="text"
                        required
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Pre-filled Extracted Skills Display */}
                  {parsedProfile && parsedProfile.extractedSkills.length > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          Extracted Skills to be Submitted with Application:
                        </span>
                        <span className="text-slate-400">{parsedProfile.extractedSkills.length} skills attached</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedProfile.extractedSkills.map(s => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attached CV Preview */}
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Attached Resume File
                    </label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <div>
                          <span className="font-bold text-slate-800 dark:text-white">
                            {parsedProfile?.fileName || 'Candidate_Resume_Verified.pdf'}
                          </span>
                          <span className="text-[11px] text-lime-700 dark:text-lime-400 block font-medium">
                            ✓ Verified by NextSoft Mock NLP Parser ({parsedProfile?.fileSize || '1.4 MB'})
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('nlp-parser')}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                      >
                        Change Resume
                      </button>
                    </div>
                  </div>

                  {/* Tailored Cover Note */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">
                        Tailored Cover Note (Auto-Generated from NLP Profile)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedJob && parsedProfile) {
                            setFormCoverNote(generateTailoredCoverNote(parsedProfile, selectedJob.title, selectedJob.companyName));
                            if (onToast) onToast('Re-tailored cover note for ' + selectedJob.title);
                          }
                        }}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Re-generate Note</span>
                      </button>
                    </div>
                    <textarea
                      rows={5}
                      required
                      value={formCoverNote}
                      onChange={(e) => setFormCoverNote(e.target.value)}
                      placeholder="Enter or customize your cover note..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 resize-none font-sans leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Pre-Filled Application to {selectedJob?.companyName}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: MY APPLICATIONS */}
          {/* ------------------------------------------------------------- */}
          {activeTab === 'applications' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#142B4A] dark:text-white">
                    Tracked Candidate Applications ({submittedApplications.length})
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time status tracking for applications submitted via the candidate dashboard.
                  </p>
                </div>
              </div>

              {submittedApplications.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    No Applications Submitted Yet
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Upload your resume to extract your skills, or jump to the Pre-Filled Application Form tab to submit your first application.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('apply-form')}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Open Pre-filled Application Form
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {submittedApplications.map((app, idx) => {
                    const targetJob = jobs.find(j => j.id === app.jobId);
                    return (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                          <div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {targetJob ? targetJob.title : 'Job Opening'}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">
                              Company: <strong>{targetJob?.companyName || 'Employer Partner'}</strong> · Applied: {app.appliedAt}
                            </span>
                          </div>

                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-lime-50 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300 border border-lime-200 dark:border-lime-800 self-start sm:self-auto flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Submitted & Under Review</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                          <div>Applicant: <strong className="text-slate-800 dark:text-slate-200">{app.fullName}</strong></div>
                          <div>Role: <strong className="text-slate-800 dark:text-slate-200">{app.currentRole}</strong></div>
                          <div className="truncate">CV: <strong className="text-slate-800 dark:text-slate-200">{app.cvFileName || 'Resume.pdf'}</strong></div>
                        </div>

                        {app.extractedSkills && app.extractedSkills.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1">
                            {app.extractedSkills.slice(0, 5).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
                                {s}
                              </span>
                            ))}
                            {app.extractedSkills.length > 5 && (
                              <span className="text-[10px] text-slate-400">+{app.extractedSkills.length - 5} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
