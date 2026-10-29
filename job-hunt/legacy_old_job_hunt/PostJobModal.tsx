import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  CheckCircle2, 
  Building2, 
  User, 
  Users, 
  ShieldCheck, 
  Target, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  Sparkles,
  Lock,
  Globe,
  HelpCircle
} from 'lucide-react';
import { Job, JobType, ExperienceLevel, PosterType } from '../types';
import { CountryLocationSelector } from './CountryLocationSelector';
import { useCurrency, CURRENCY_LIST } from '../context/CurrencyContext';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: Job) => void;
  initialPosterType?: PosterType;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
  initialPosterType = 'company'
}) => {
  // Selected Persona / Poster Type
  const [posterType, setPosterType] = useState<PosterType>(initialPosterType);

  // Common Form States
  const { currentCurrency } = useCurrency();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Nigeria');
  const [workArrangement, setWorkArrangement] = useState<'Remote' | 'Hybrid' | 'On-Site'>('Hybrid');
  const [employmentType, setEmploymentType] = useState<JobType>('Full-Time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Mid Level');
  const [category, setCategory] = useState('Information Technology');
  const [salaryRange, setSalaryRange] = useState('₦1,800,000 - ₦2,500,000');
  const [currency, setCurrency] = useState(currentCurrency || 'NGN');
  const [department, setDepartment] = useState('Engineering');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('Design and implement scalable technical solutions\nCollaborate with cross-functional leadership\nMentor junior team members and maintain code quality');
  const [requirementsText, setRequirementsText] = useState('4+ years of relevant domain experience\nBachelor\'s degree or equivalent practical track record\nStrong written and oral communication capabilities');
  const [benefitsText, setBenefitsText] = useState('Comprehensive family health cover\nPerformance bonus and stock options\nFlexible remote work stipend');
  
  // Persona-Specific States
  // 1. Individual
  const [individualName, setIndividualName] = useState('Tunde Balogun');
  const [individualTitle, setIndividualTitle] = useState('Solo Tech Founder & Angel Investor');
  const [individualIsConfidential, setIndividualIsConfidential] = useState(false);

  // 2. Company / Employer
  const [companyName, setCompanyName] = useState('Sterling Tech Group');
  const [companyIndustry, setCompanyIndustry] = useState('Banking & Financial Technology');

  // 3. Recruiter / Agency
  const [agencyName, setAgencyName] = useState('Apex Staffing & Talent Africa');
  const [agencyClientName, setAgencyClientName] = useState('Fast-Growing Logistics Unicorn');
  const [agencyIsClientConfidential, setAgencyIsClientConfidential] = useState(true);
  const [agencyArrangement, setAgencyArrangement] = useState('Direct Hire Contingent Placement');

  // 4. Headhunter
  const [headhunterFirm, setHeadhunterFirm] = useState('NextSoft Retained Executive Search');
  const [mandateLevel, setMandateLevel] = useState<'C-Level (CEO, CTO, CFO, CPO)' | 'VP / Managing Director' | 'Board Director'>('C-Level (CEO, CTO, CFO, CPO)');
  const [isConfidentialMandate, setIsConfidentialMandate] = useState(true);

  // Submitter contact
  const [contactEmail, setContactEmail] = useState('recruiter.contact@nextsofthr.com');

  const [isSuccess, setIsSuccess] = useState(false);

  // Update posterType if initialPosterType prop changes
  useEffect(() => {
    if (initialPosterType) {
      setPosterType(initialPosterType);
    }
  }, [initialPosterType]);

  // Quick Template Populator
  const loadTemplate = (type: PosterType) => {
    setPosterType(type);
    if (type === 'individual') {
      setTitle('Executive Assistant & Project Operations Lead');
      setIndividualName('Dr. Adeleke Family Office & Ventures');
      setIndividualTitle('Private Principal & Investor');
      setLocation('Lagos, Nigeria & Remote');
      setWorkArrangement('Hybrid');
      setEmploymentType('Full-Time');
      setExperienceLevel('Mid Level');
      setCategory('Administration');
      setSalaryRange('₦850,000 - ₦1,400,000 / month');
      setCurrency('NGN');
      setDepartment('Private Office');
      setDescription('Directly support the Principal across venture investments, international travel arrangements, diary coordination, and strategic business initiatives.');
      setResponsibilitiesText('Manage executive calendar, private engagements, and flight itineraries\nPrepare briefing documents, board packs, and investment summaries\nCoordinate personal property and vendor operational contracts');
      setRequirementsText('3+ years assisting high-net-worth individuals or C-suite founders\nExceptional discretion, confidential record management, and punctuality\nBachelor’s degree and mastery of Google Workspace / Microsoft 365');
    } else if (type === 'company') {
      setTitle('Senior Lead Backend Engineer (Payment Rails)');
      setCompanyName('Paystack Financial');
      setCompanyIndustry('Financial Technology');
      setLocation('Lagos, Nigeria (Hybrid)');
      setWorkArrangement('Hybrid');
      setEmploymentType('Full-Time');
      setExperienceLevel('Senior Level');
      setCategory('Information Technology');
      setSalaryRange('₦2,500,000 - ₦3,800,000 / month');
      setCurrency('NGN');
      setDepartment('Core Infrastructure');
      setDescription('Join Paystack’s core banking infrastructure squad building fault-tolerant transaction switches processing billions in monthly volume.');
      setResponsibilitiesText('Architect low-latency payment reconciliation pipelines\nCollaborate with product and compliance on PCI-DSS level 1 standards\nMentor mid-level engineers and conduct deep architectural reviews');
      setRequirementsText('5+ years building distributed backend services in TypeScript/Node or Go\nDeep experience with PostgreSQL, Redis, Kafka, and AWS\nDemonstrated understanding of financial transaction ledgers');
    } else if (type === 'agency') {
      setTitle('Financial Controller & Statutory Accounting Lead');
      setAgencyName('Apex Staffing & Talent Africa');
      setAgencyClientName('Tier-1 Multinational FMCG Conglomerate');
      setAgencyIsClientConfidential(true);
      setLocation('Nairobi, Kenya');
      setWorkArrangement('On-Site');
      setEmploymentType('Full-Time');
      setExperienceLevel('Senior Level');
      setCategory('Banking & Finance');
      setSalaryRange('KSh 500,000 - KSh 750,000 / month');
      setCurrency('KES');
      setDepartment('Finance & Accounting');
      setDescription('Recruitment agency mandate on behalf of a leading multinational manufacturer seeking an experienced Financial Controller.');
      setResponsibilitiesText('Oversee statutory accounting, local tax compliance, and audits\nManage monthly balance sheet reconciliations and board financial packages\nLiaise with external audit partners (PwC, EY, KPMG)');
      setRequirementsText('7+ years accounting leadership; CPA(K) or ACCA required\nProven track record with ERP implementations (SAP or Oracle)\nStrong leadership and commercial acumen');
    } else if (type === 'headhunter') {
      setTitle('Chief Technology Officer (Confidential Banking Group)');
      setHeadhunterFirm('NextSoft Retained Executive Practice');
      setMandateLevel('C-Level (CEO, CTO, CFO, CPO)');
      setIsConfidentialMandate(true);
      setLocation('London, United Kingdom & Remote');
      setWorkArrangement('Hybrid');
      setEmploymentType('Full-Time');
      setExperienceLevel('Executive');
      setCategory('Information Technology');
      setSalaryRange('£140,000 - £185,000 / year + Equity');
      setCurrency('GBP');
      setDepartment('Executive C-Suite');
      setDescription('Confidential retained executive headhunting search for a Chief Technology Officer leading a 150-person engineering organization across Europe and Africa.');
      setResponsibilitiesText('Define technology vision, cloud modernization, and engineering culture\nLead enterprise transformation, core banking migrations, and AI adoption\nReport directly to the Group Chief Executive and Board of Directors');
      setRequirementsText('10+ years progressive technology leadership with 4+ years at VP/CTO level\nProven history of scaling enterprise fintech or banking platforms\nMastery of cloud security, governance, and capital allocation');
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    let hiringEntityDisplay = companyName;
    let recruiterSourceDisplay = 'Direct Employer';
    let initials = 'CO';

    if (posterType === 'individual') {
      hiringEntityDisplay = individualIsConfidential 
        ? 'Private Individual / Family Client' 
        : individualName;
      recruiterSourceDisplay = 'Individual / Founder';
      initials = individualName
        .split(' ')
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'IN';
    } else if (posterType === 'company') {
      hiringEntityDisplay = companyName;
      recruiterSourceDisplay = 'Direct Employer';
      initials = companyName
        .split(' ')
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'CO';
    } else if (posterType === 'agency') {
      hiringEntityDisplay = agencyIsClientConfidential
        ? `${agencyName} (Confidential Client)`
        : `${agencyClientName} via ${agencyName}`;
      recruiterSourceDisplay = 'Partner Agency';
      initials = agencyName
        .split(' ')
        .map(w => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || 'AG';
    } else if (posterType === 'headhunter') {
      hiringEntityDisplay = isConfidentialMandate
        ? `${headhunterFirm} (Confidential Search)`
        : headhunterFirm;
      recruiterSourceDisplay = 'Executive Headhunter';
      initials = 'HH';
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      companyId: `comp-${posterType}-${Date.now()}`,
      companyName: hiringEntityDisplay,
      companyLogo: '',
      companyInitials: initials,
      isVerified: true,
      location,
      workArrangement,
      employmentType,
      salaryRange,
      currency,
      experienceLevel,
      category,
      industry: posterType === 'company' ? companyIndustry : `${category} Industry`,
      datePosted: 'Just now',
      department,
      description,
      responsibilities: responsibilitiesText.split('\n').filter(Boolean),
      requirements: requirementsText.split('\n').filter(Boolean),
      benefits: benefitsText.split('\n').filter(Boolean),
      applicantCount: 0,
      isFeatured: true,
      recruiterSource: recruiterSourceDisplay,
      posterType,
      posterDetails: {
        contactName: posterType === 'individual' ? individualName : undefined,
        contactEmail,
        isConfidential: posterType === 'individual' ? individualIsConfidential : (posterType === 'headhunter' ? isConfidentialMandate : agencyIsClientConfidential),
        agencyClientName: posterType === 'agency' ? agencyClientName : undefined,
        headhunterFirm: posterType === 'headhunter' ? headhunterFirm : undefined,
        individualTitle: posterType === 'individual' ? individualTitle : undefined,
        retainedMandateLevel: posterType === 'headhunter' ? mandateLevel : undefined
      }
    };

    onJobCreated(newJob);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold shadow-sm">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#142B4A] dark:text-white">Publish a Vacancy</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-[#2563EB] dark:text-blue-300">
                  Universal Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Post as an Individual, Employer, Staffing Agency, or Executive Headhunter
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {isSuccess ? (
            <div className="py-14 text-center space-y-3">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-950/70 text-lime-700 dark:text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-300 dark:border-lime-800">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Vacancy Successfully Published!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Your role has been published to the NextSoftHR recruitment network under your chosen persona ({posterType.toUpperCase()}) with candidate screening and scheduler enabled.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* --- Step 1: Select Poster Identity Persona --- */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-1.5">
                    <span>1. Who is posting this vacancy? *</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Select your hiring identity</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  
                  {/* Option A: Individual */}
                  <button
                    type="button"
                    onClick={() => setPosterType('individual')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      posterType === 'individual'
                        ? 'bg-blue-50/90 dark:bg-blue-950/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`p-2 rounded-xl ${posterType === 'individual' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <User className="w-4 h-4" />
                        </span>
                        {posterType === 'individual' && (
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                        )}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">Individual</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Solo founder, private family client, or independent principal
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] font-semibold text-[#2563EB] dark:text-blue-400">
                      Direct hire · No agency
                    </div>
                  </button>

                  {/* Option B: Employer / Company */}
                  <button
                    type="button"
                    onClick={() => setPosterType('company')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      posterType === 'company'
                        ? 'bg-blue-50/90 dark:bg-blue-950/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`p-2 rounded-xl ${posterType === 'company' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Building2 className="w-4 h-4" />
                        </span>
                        {posterType === 'company' && (
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                        )}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">Employer / Company</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Direct corporate hiring team, SME, startup, or enterprise
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] font-semibold text-[#2563EB] dark:text-blue-400">
                      Verified company badge
                    </div>
                  </button>

                  {/* Option C: Recruiter / Agency */}
                  <button
                    type="button"
                    onClick={() => setPosterType('agency')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      posterType === 'agency'
                        ? 'bg-blue-50/90 dark:bg-blue-950/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`p-2 rounded-xl ${posterType === 'agency' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Users className="w-4 h-4" />
                        </span>
                        {posterType === 'agency' && (
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                        )}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">Recruiter or Agency</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Staffing firm, RPO partner, or external recruitment consultant
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] font-semibold text-[#2563EB] dark:text-blue-400">
                      Agency placement tag
                    </div>
                  </button>

                  {/* Option D: Headhunter */}
                  <button
                    type="button"
                    onClick={() => setPosterType('headhunter')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      posterType === 'headhunter'
                        ? 'bg-blue-50/90 dark:bg-blue-950/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`p-2 rounded-xl ${posterType === 'headhunter' ? 'bg-[#2563EB] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Target className="w-4 h-4" />
                        </span>
                        {posterType === 'headhunter' && (
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                        )}
                      </div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">Headhunter</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        Executive search consultant sourcing C-suite, VP, & Board talent
                      </p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] font-semibold text-[#2563EB] dark:text-blue-400">
                      Retained executive search
                    </div>
                  </button>

                </div>

                {/* Quick Auto-Fill Template Helper */}
                <div className="mt-2.5 flex items-center justify-between bg-slate-50 dark:bg-slate-850 p-2 rounded-xl border border-slate-200/70 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Want an example? Load a realistic template:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => loadTemplate(posterType)}
                    className="text-[11px] font-bold text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Load {posterType.charAt(0).toUpperCase() + posterType.slice(1)} Template ⚡
                  </button>
                </div>
              </div>

              {/* --- Step 2: Persona-Specific Entity Fields --- */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-850/80 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                  {posterType === 'individual' && '👤 Individual / Private Client Details'}
                  {posterType === 'company' && '🏢 Employer / Company Profile'}
                  {posterType === 'agency' && '🤝 Staffing Agency & Client Representation'}
                  {posterType === 'headhunter' && '🎯 Executive Search Mandate Details'}
                </span>

                {/* Individual specific fields */}
                {posterType === 'individual' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Full Name or Private Entity *</label>
                      <input
                        type="text"
                        required
                        value={individualName}
                        onChange={(e) => setIndividualName(e.target.value)}
                        placeholder="e.g. Tunde Balogun or Adeleke Family Office"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Role / Hiring Capacity</label>
                      <input
                        type="text"
                        value={individualTitle}
                        onChange={(e) => setIndividualTitle(e.target.value)}
                        placeholder="e.g. Solo Tech Founder, Private Principal"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={individualIsConfidential}
                          onChange={(e) => setIndividualIsConfidential(e.target.checked)}
                          className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          Keep my individual name confidential on public listings (display as "Private Client / Individual")
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Company specific fields */}
                {posterType === 'company' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Company / Organization Name *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Paystack Financial"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Company Industry Sector</label>
                      <input
                        type="text"
                        value={companyIndustry}
                        onChange={(e) => setCompanyIndustry(e.target.value)}
                        placeholder="e.g. Financial Technology, Heavy Industry"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                  </div>
                )}

                {/* Agency specific fields */}
                {posterType === 'agency' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Recruitment Agency / Firm Name *</label>
                      <input
                        type="text"
                        required
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder="e.g. Apex Staffing Partners Africa"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Client Hiring Organization</label>
                      <input
                        type="text"
                        value={agencyClientName}
                        onChange={(e) => setAgencyClientName(e.target.value)}
                        placeholder="e.g. Leading Multinational FMCG Brand"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={agencyIsClientConfidential}
                          onChange={(e) => setAgencyIsClientConfidential(e.target.checked)}
                          className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          Keep client identity confidential during initial application stage
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Headhunter specific fields */}
                {posterType === 'headhunter' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Executive Search Practice Name *</label>
                      <input
                        type="text"
                        required
                        value={headhunterFirm}
                        onChange={(e) => setHeadhunterFirm(e.target.value)}
                        placeholder="e.g. NextSoft Retained Executive Practice"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-[#2563EB]/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Retained Mandate Tier</label>
                      <select
                        value={mandateLevel}
                        onChange={(e) => setMandateLevel(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs"
                      >
                        <option value="C-Level (CEO, CTO, CFO, CPO)">C-Level (CEO, CTO, CFO, CPO)</option>
                        <option value="VP / Managing Director">VP / Managing Director</option>
                        <option value="Board Director">Non-Executive Board Director</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={isConfidentialMandate}
                          onChange={(e) => setIsConfidentialMandate(e.target.checked)}
                          className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-amber-500" />
                          <span>Confidential retained executive search (disclosed exclusively under NDA to shortlisted leaders)</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* --- Step 3: Role Specifications & Country Selection --- */}
              <div className="space-y-3">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                  2. Role Title & Core Parameters
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Lead Distributed Systems Engineer"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                    />
                  </div>

                  {/* Country & Location with Global Selector */}
                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      Location / Target Country *
                    </label>
                    <CountryLocationSelector
                      value={location}
                      onChange={setLocation}
                      placeholder="Select any country in the world..."
                      variant="compact"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Work Arrangement</label>
                    <select
                      value={workArrangement}
                      onChange={(e) => setWorkArrangement(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="On-Site">On-Site</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Employment Type</label>
                    <select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Experience Level</label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Lead / Director">Lead / Director</option>
                      <option value="Executive">Executive / C-Suite</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs cursor-pointer"
                    >
                      <option value="Information Technology">Information Technology</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Banking & Finance">Banking & Finance</option>
                      <option value="Sales & Marketing">Sales & Marketing</option>
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Administration">Administration</option>
                    </select>
                  </div>

                  {/* Compensation */}
                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Salary Range & Currency *</label>
                    <div className="flex gap-2">
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as any)}
                        className="w-28 px-2 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-xs font-semibold"
                      >
                        {CURRENCY_LIST.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} ({c.symbol})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        required
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        placeholder="e.g. ₦1,500,000 - ₦2,200,000"
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Step 4: Descriptions and Responsibilities --- */}
              <div className="space-y-3">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                  3. Description & Candidate Requirements
                </span>

                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Role Summary *</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summarize the core objectives and impact of this role..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Key Responsibilities (One per line)</label>
                    <textarea
                      rows={3}
                      value={responsibilitiesText}
                      onChange={(e) => setResponsibilitiesText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Qualifications & Requirements (One per line)</label>
                    <textarea
                      rows={3}
                      value={requirementsText}
                      onChange={(e) => setRequirementsText(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Benefits & Perks (One per line)</label>
                  <textarea
                    rows={2}
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-lime-600 dark:text-lime-400" />
                  <span>
                    Posting as: <strong className="text-slate-800 dark:text-slate-200 capitalize">{posterType}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Publish Vacancy</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
