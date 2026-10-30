import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Palette, 
  Eye, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Award, 
  ShieldCheck, 
  Copy,
  Printer,
  CheckCircle2
} from 'lucide-react';
import { ParsedResumeProfile } from '../types';

interface WorkExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  honors?: string;
}

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile?: ParsedResumeProfile | null;
  onSaveToProfile?: (profile: ParsedResumeProfile) => void;
  onToast?: (message: string) => void;
}

export const ResumeBuilderModal: React.FC<ResumeBuilderModalProps> = ({
  isOpen,
  onClose,
  initialProfile,
  onSaveToProfile,
  onToast
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Step 1: Personal Info
  const [fullName, setFullName] = useState(initialProfile?.fullName || 'Adaeze Okonkwo');
  const [headline, setHeadline] = useState(initialProfile?.currentRole || 'Senior HR Business Partner & People Operations Lead');
  const [email, setEmail] = useState(initialProfile?.email || 'adaeze.okonkwo@talentleader.org');
  const [phone, setPhone] = useState(initialProfile?.phone || '+234 812 345 6789');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/adaeze-okonkwo');
  const [portfolio, setPortfolio] = useState('adaeze-hr.talent.africa');
  const [summary, setSummary] = useState(
    initialProfile?.summary || 
    'Accomplished, CIPM-certified People Operations Leader with 7+ years directing talent acquisition, organizational restructuring, and statutory labor compliance across fast-scaling tech and financial institutions in West Africa.'
  );

  // Step 2: Work Experience
  const [experiences, setExperiences] = useState<WorkExperienceEntry[]>([
    {
      id: 'exp-1',
      jobTitle: 'Senior HR Business Partner',
      company: 'NextSoftHR Internal Talent',
      location: 'Lagos, Nigeria',
      startDate: '2021',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Spearheaded full-lifecycle talent acquisition for 140+ engineering and product specialists, reducing average time-to-hire by 32%.',
        'Architected comprehensive HRMS restructuring and automated onboarding pipelines adhering to the Nigerian Labour Act.',
        'Partnered with executive leadership to implement OKR-driven quarterly performance calibrations across multi-country hubs.'
      ]
    },
    {
      id: 'exp-2',
      jobTitle: 'People Operations & Talent Specialist',
      company: 'Fintech Capital Alliance',
      location: 'Accra, Ghana & Lagos',
      startDate: '2018',
      endDate: '2021',
      isCurrent: false,
      bullets: [
        'Administered payroll processing and statutory pension remittances (NSITF, ITF) for 85 corporate personnel without compliance infractions.',
        'Designed competitive compensation and benefits benchmarks that decreased annualized voluntary attrition from 19% to 7%.'
      ]
    }
  ]);

  // Step 3: Education & Certifications
  const [educations, setEducations] = useState<EducationEntry[]>([
    {
      id: 'edu-1',
      degree: 'B.Sc. Human Resource Management & Industrial Relations',
      institution: 'University of Lagos',
      location: 'Lagos, Nigeria',
      graduationYear: '2017',
      honors: 'First Class Honors (4.62 / 5.0 CGPA)'
    }
  ]);

  const [certifications, setCertifications] = useState<string[]>([
    'CIPM Chartered Member (ACIPM) - Institute of Personnel Management Nigeria',
    'SHRM-SCP (Senior Certified Professional) - SHRM International',
    'Certified OKR Practitioner & Performance Architect'
  ]);
  const [newCertInput, setNewCertInput] = useState('');

  // Step 4: Skills & Languages
  const [skills, setSkills] = useState<string[]>(
    initialProfile?.extractedSkills || [
      'Strategic Workforce Planning',
      'CIPM Certified Member',
      'Nigerian Labour Act Compliance',
      'Executive Talent Acquisition',
      'Performance Management',
      'HRMS & Payroll Integration',
      'Compensation & Benefits Design',
      'Succession Architecture'
    ]
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [languages, setLanguages] = useState<string[]>(['English (Fluent / Professional)', 'Yoruba (Native)', 'French (Working Proficiency)']);
  const [newLangInput, setNewLangInput] = useState('');

  // Step 5: Design Theme
  const [templateTheme, setTemplateTheme] = useState<'navy' | 'emerald' | 'slate' | 'royal'>('navy');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');

  if (!isOpen) return null;

  // Helpers for Experience
  const handleAddExperience = () => {
    const newEntry: WorkExperienceEntry = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: ['Led key initiative resulting in measurable growth or efficiency.']
    };
    setExperiences([...experiences, newEntry]);
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperienceEntry, value: any) => {
    setExperiences(experiences.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const handleAddBullet = (expId: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, bullets: [...e.bullets, 'Delivered significant organizational impact.'] };
      }
      return e;
    }));
  };

  const handleUpdateBullet = (expId: string, idx: number, text: string) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        const next = [...e.bullets];
        next[idx] = text;
        return { ...e, bullets: next };
      }
      return e;
    }));
  };

  const handleRemoveBullet = (expId: string, idx: number) => {
    setExperiences(experiences.map(e => {
      if (e.id === expId) {
        return { ...e, bullets: e.bullets.filter((_, i) => i !== idx) };
      }
      return e;
    }));
  };

  // Helpers for Education
  const handleAddEducation = () => {
    setEducations([...educations, {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      location: '',
      graduationYear: ''
    }]);
  };

  const handleRemoveEducation = (id: string) => {
    setEducations(educations.filter(e => e.id !== id));
  };

  // Skill Helpers
  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // Cert Helpers
  const handleAddCert = () => {
    if (newCertInput.trim() && !certifications.includes(newCertInput.trim())) {
      setCertifications([...certifications, newCertInput.trim()]);
      setNewCertInput('');
    }
  };

  const handleRemoveCert = (cert: string) => {
    setCertifications(certifications.filter(c => c !== cert));
  };

  // Save to Profile
  const handleSaveToCandidateProfile = () => {
    const updatedProfile: ParsedResumeProfile = {
      fullName,
      email,
      phone,
      currentRole: headline,
      yearsOfExperience: '7+ years',
      extractedSkills: skills,
      verifiedSkills: certifications.map(c => ({
        name: c.split('-')[0].trim(),
        verifiedAt: 'Verified via Resume Builder',
        score: 95,
        type: 'assessment'
      })),
      education: educations.map(e => `${e.degree}, ${e.institution} (${e.graduationYear})`).join('; ') || 'Bachelor of Science',
      certifications,
      confidenceScore: 98,
      fileName: `${fullName.replace(/\s+/g, '_')}_Official_Resume.pdf`,
      parsedAt: 'Just now',
      summary
    };

    if (onSaveToProfile) {
      onSaveToProfile(updatedProfile);
    }
    if (onToast) {
      onToast(`✓ Resume profile synchronized! Updated your match rating & auto-fill forms.`);
    }
  };

  // Print/Download PDF
  const handlePrintDownload = () => {
    window.print();
    if (onToast) {
      onToast('🖨️ Opening print dialog: Select "Save as PDF" for a high-definition PDF download!');
    }
  };

  const themeColors = {
    navy: {
      primary: '#142B4A',
      accent: '#2563EB',
      headerBg: 'bg-[#142B4A]',
      textColor: 'text-[#142B4A]',
      borderColor: 'border-[#142B4A]'
    },
    emerald: {
      primary: '#064E3B',
      accent: '#059669',
      headerBg: 'bg-[#064E3B]',
      textColor: 'text-[#064E3B]',
      borderColor: 'border-[#064E3B]'
    },
    slate: {
      primary: '#1E293B',
      accent: '#475569',
      headerBg: 'bg-[#1E293B]',
      textColor: 'text-[#1E293B]',
      borderColor: 'border-[#1E293B]'
    },
    royal: {
      primary: '#312E81',
      accent: '#4F46E5',
      headerBg: 'bg-[#312E81]',
      textColor: 'text-[#312E81]',
      borderColor: 'border-[#312E81]'
    }
  };

  const selectedTheme = themeColors[templateTheme];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#142B4A] dark:bg-[#070e1b] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  NextSoftHR Resume Builder Wizard
                </h2>
                <span className="text-[10px] bg-lime-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                  ATS Optimized & PDF Export
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Create a high-impact, professional resume formatted to pass corporate ATS filters across Africa & Global markets.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Navigation */}
        <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-bold">
            {[
              { num: 1, label: 'Personal & Bio' },
              { num: 2, label: 'Work Experience' },
              { num: 3, label: 'Education & Certs' },
              { num: 4, label: 'Skills & Languages' },
              { num: 5, label: 'Preview & Download' }
            ].map(step => (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num)}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  currentStep === step.num
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : currentStep > step.num
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black bg-black/10">
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span>{step.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Step Buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrintDownload}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Personal & Bio */}
          {currentStep === 1 && (
            <div className="space-y-5 max-w-3xl mx-auto animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Step 1: Contact Details & Executive Summary
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide your primary contact channels and a concise summary highlighting your domain impact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Adaeze Okonkwo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Professional Title / Headline *</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Senior HR Business Partner | People Ops Lead"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. adaeze@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +234 812 345 6789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location (City, Country) *</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Lagos, Nigeria / Remote"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Bio Summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Executive Summary & Value Proposition</label>
                  <button
                    type="button"
                    onClick={() => {
                      setSummary(`Results-driven ${headline} with extensive tenure delivering measurable impact in fast-paced African and international markets. Proven track record executing strategic initiatives, optimizing operational pipelines, and championing talent excellence.`);
                      if (onToast) onToast('✨ AI enhanced professional summary generated!');
                    }}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <span>AI Polish Summary</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summarize your years of experience, core achievements, and the specific value you deliver..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Work Experience */}
          {currentStep === 2 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Step 2: Professional Work Experience
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Detail your career history using metric-driven bullet points (Action Verb + Scope + Result).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-5">
                {experiences.map((exp, expIdx) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                      <span className="font-extrabold text-xs text-slate-700 dark:text-slate-300">
                        Role #{expIdx + 1}
                      </span>
                      {experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Title *</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company / Organization *</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Paystack Financial"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. Lagos, Nigeria / Remote"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="e.g. 2021"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="e.g. Present"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          Achievements & Impact Bullet Points:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(exp.id)}
                          className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Bullet</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <span className="text-slate-400 mt-2 font-black">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                            />
                            {exp.bullets.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(exp.id, bIdx)}
                                className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Education & Certifications */}
          {currentStep === 3 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Step 3: Academic Degrees & Professional Certifications
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Add formal university education and professional charters (CIPM, ICAN, CFA, AWS, PMP, SHRM).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              {/* Degrees */}
              <div className="space-y-4">
                {educations.map((edu, idx) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Degree #{idx + 1}</span>
                      {educations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Degree / Qualification *</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => setEducations(educations.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed))}
                          placeholder="e.g. B.Sc. Computer Science"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Institution / University *</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => setEducations(educations.map(ed => ed.id === edu.id ? { ...ed, institution: e.target.value } : ed))}
                          placeholder="e.g. University of Lagos"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Graduation Year</label>
                        <input
                          type="text"
                          value={edu.graduationYear}
                          onChange={(e) => setEducations(educations.map(ed => ed.id === edu.id ? { ...ed, graduationYear: e.target.value } : ed))}
                          placeholder="e.g. 2017"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Honors / GPA (Optional)</label>
                        <input
                          type="text"
                          value={edu.honors || ''}
                          onChange={(e) => setEducations(educations.map(ed => ed.id === edu.id ? { ...ed, honors: e.target.value } : ed))}
                          placeholder="e.g. First Class Honors"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certifications Block */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">
                  Professional Certifications & Licenses:
                </span>

                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-lime-600" />
                      <span>{cert}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(cert)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newCertInput}
                    onChange={(e) => setNewCertInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCert(); }}}
                    placeholder="Add certification (e.g. AWS Solutions Architect, CIPM, PMP)..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Skills & Languages */}
          {currentStep === 4 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-150">
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Step 4: Competency Keywords & Languages
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ATS scanners search for exact keyword matches. Include technical systems, tools, and domain specialties.
                </p>
              </div>

              {/* Skills */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">
                  Core Skills ({skills.length}):
                </span>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-400 hover:text-red-500 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                    placeholder="+ Add new skill keyword..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3.5 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                  >
                    Add Skill
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="font-bold text-slate-900 dark:text-white text-xs block">
                  Spoken Languages:
                </span>

                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang}</span>
                      <button
                        type="button"
                        onClick={() => setLanguages(languages.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-red-500 cursor-pointer ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newLangInput}
                    onChange={(e) => setNewLangInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (newLangInput.trim()) {
                          setLanguages([...languages, newLangInput.trim()]);
                          setNewLangInput('');
                        }
                      }
                    }}
                    placeholder="e.g. Swahili (Fluent), Hausa (Conversational)..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newLangInput.trim()) {
                        setLanguages([...languages, newLangInput.trim()]);
                        setNewLangInput('');
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Live Resume Preview & Export */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Toolbar Controls */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-blue-500" />
                    <span>Template Color Theme:</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'navy', label: 'Navy Elite', color: 'bg-[#142B4A]' },
                      { id: 'emerald', label: 'Pan-African Emerald', color: 'bg-emerald-800' },
                      { id: 'royal', label: 'Royal Tech', color: 'bg-indigo-900' },
                      { id: 'slate', label: 'Minimalist Slate', color: 'bg-slate-800' }
                    ].map(th => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setTemplateTheme(th.id as any)}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                          templateTheme === th.id
                            ? 'border-blue-500 ring-2 ring-blue-500/30 font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${th.color}`} />
                        <span>{th.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSaveToCandidateProfile}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/70 dark:hover:bg-blue-900 text-[#2563EB] dark:text-blue-300 font-bold rounded-xl border border-blue-200 dark:border-blue-800 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sync to My Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintDownload}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              </div>

              {/* Formatted A4 Printable Resume Sheet */}
              <div className="bg-slate-200 dark:bg-slate-950/80 p-4 sm:p-8 rounded-3xl flex justify-center">
                <div 
                  id="printable-resume" 
                  className={`bg-white text-slate-900 w-full max-w-3xl p-8 sm:p-12 rounded-xl shadow-xl border border-slate-300 font-${fontFamily} space-y-6 leading-relaxed print:p-0 print:border-0 print:shadow-none print:m-0`}
                  style={{ minHeight: '1000px' }}
                >
                  {/* Top Resume Header */}
                  <div className={`border-b-2 pb-4 ${selectedTheme.borderColor}`}>
                    <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${selectedTheme.textColor}`}>
                      {fullName}
                    </h1>
                    <p className="text-sm font-bold text-slate-700 mt-1 uppercase tracking-wider">
                      {headline}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                      <span>✉️ {email}</span>
                      <span>📞 {phone}</span>
                      <span>📍 {location}</span>
                      {linkedin && <span>🔗 {linkedin}</span>}
                    </div>
                  </div>

                  {/* Executive Summary */}
                  {summary && (
                    <div className="space-y-1.5">
                      <h2 className={`text-xs font-black uppercase tracking-widest border-b pb-1 ${selectedTheme.textColor} border-slate-200`}>
                        Professional Summary
                      </h2>
                      <p className="text-xs text-slate-700 leading-relaxed text-justify">
                        {summary}
                      </p>
                    </div>
                  )}

                  {/* Core Competencies & Skills */}
                  {skills.length > 0 && (
                    <div className="space-y-1.5">
                      <h2 className={`text-xs font-black uppercase tracking-widest border-b pb-1 ${selectedTheme.textColor} border-slate-200`}>
                        Core Skills & Competencies
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs text-slate-800">
                        {skills.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 font-medium">
                            <span className="text-slate-400 font-bold">•</span>
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Experience */}
                  <div className="space-y-4">
                    <h2 className={`text-xs font-black uppercase tracking-widest border-b pb-1 ${selectedTheme.textColor} border-slate-200`}>
                      Professional Experience
                    </h2>

                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="space-y-1 text-xs">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                            <h3 className="font-extrabold text-sm text-slate-900">
                              {exp.jobTitle}
                            </h3>
                            <span className="text-xs font-bold text-slate-600">
                              {exp.startDate} – {exp.endDate}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                            <span>{exp.company}</span>
                            <span>{exp.location}</span>
                          </div>

                          <ul className="list-disc pl-5 space-y-1 text-slate-700 pt-1">
                            {exp.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-relaxed">
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Academic Honors */}
                  <div className="space-y-3">
                    <h2 className={`text-xs font-black uppercase tracking-widest border-b pb-1 ${selectedTheme.textColor} border-slate-200`}>
                      Education & Academics
                    </h2>

                    <div className="space-y-2">
                      {educations.map((edu) => (
                        <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                          <div>
                            <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                            <p className="text-slate-600">{edu.institution} {edu.honors ? `· ${edu.honors}` : ''}</p>
                          </div>
                          <span className="font-semibold text-slate-600">{edu.graduationYear}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Certifications */}
                  {certifications.length > 0 && (
                    <div className="space-y-2">
                      <h2 className={`text-xs font-black uppercase tracking-widest border-b pb-1 ${selectedTheme.textColor} border-slate-200`}>
                        Certifications & Licensures
                      </h2>
                      <div className="space-y-1 text-xs text-slate-800">
                        {certifications.map((c, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-700 font-bold">✓</span>
                            <span className="font-semibold">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {languages.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-slate-800">Languages: </span>
                      <span className="text-slate-600">{languages.join(' · ')}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
