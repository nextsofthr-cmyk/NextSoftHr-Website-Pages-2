import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Bookmark, 
  CheckCircle, 
  Building2, 
  LayoutGrid, 
  List, 
  Clock, 
  Filter, 
  Bell, 
  User, 
  Users, 
  Target, 
  Banknote, 
  GraduationCap, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Tag, 
  ArrowDownUp, 
  Calendar, 
  Check, 
  RotateCcw,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Job, JobType, ExperienceLevel } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CountryLocationSelector } from './CountryLocationSelector';
import { matchJobLocation } from '../data/countries';

interface JobSearchModalOrPageProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  initialParams?: { 
    keyword?: string; 
    location?: string; 
    category?: string; 
    employmentType?: string; 
    arrangement?: string;
    title?: string;
  };
  onSelectJob: (job: Job) => void;
  onToggleSaveJob: (jobId: string) => void;
  savedJobIds: string[];
  onApplyDirect: (job: Job) => void;
  onOpenJobAlerts?: (params?: { keyword?: string; location?: string; category?: string }) => void;
}

// Salary parser and normalizer
const parseSalary = (salaryStr: string, currency: string = 'NGN') => {
  if (!salaryStr) return { min: 0, max: 0, normalizedMin: 0, normalizedMax: 0 };
  const nums = salaryStr.match(/[\d,]+(?:\.\d+)?/g)?.map(n => parseFloat(n.replace(/,/g, ''))).filter(n => !isNaN(n)) || [];
  const rawMin = nums[0] || 0;
  const rawMax = nums[1] || nums[0] || 0;

  // Approximate FX to NGN monthly for unified comparison across currencies
  let fxToNgn = 1;
  const c = currency.toUpperCase();
  if (c === 'USD') fxToNgn = 1500;
  else if (c === 'GBP') fxToNgn = 1900;
  else if (c === 'EUR') fxToNgn = 1600;
  else if (c === 'CAD') fxToNgn = 1100;
  else if (c === 'ZAR') fxToNgn = 80;
  else if (c === 'KES') fxToNgn = 11.5;
  else if (c === 'GHS') fxToNgn = 95;
  else if (c === 'AED') fxToNgn = 405;
  else if (c === 'RWF') fxToNgn = 1.1;

  let normMin = rawMin * fxToNgn;
  let normMax = rawMax * fxToNgn;
  if (salaryStr.toLowerCase().includes('/ year') || salaryStr.toLowerCase().includes('year')) {
    normMin = normMin / 12;
    normMax = normMax / 12;
  }

  return { min: rawMin, max: rawMax, normalizedMin: normMin, normalizedMax: normMax };
};

// Date recency parser
const getDaysAgo = (dateStr: string): number => {
  if (!dateStr) return 999;
  const s = dateStr.toLowerCase().trim();
  if (s.includes('just now') || s.includes('today') || s.includes('hour') || s.includes('minute')) return 0;
  const matchDay = s.match(/(\d+)\s+day/);
  if (matchDay) return parseInt(matchDay[1], 10);
  const matchWeek = s.match(/(\d+)\s+week/);
  if (matchWeek) return parseInt(matchWeek[1], 10) * 7;
  const matchMonth = s.match(/(\d+)\s+month/);
  if (matchMonth) return parseInt(matchMonth[1], 10) * 30;
  const parsed = new Date(dateStr).getTime();
  if (!isNaN(parsed)) {
    return Math.max(0, Math.floor((Date.now() - parsed) / (1000 * 60 * 60 * 24)));
  }
  return 3;
};

export const JobSearchModalOrPage: React.FC<JobSearchModalOrPageProps> = ({
  isOpen,
  onClose,
  jobs,
  initialParams,
  onSelectJob,
  onToggleSaveJob,
  savedJobIds,
  onApplyDirect,
  onOpenJobAlerts
}) => {
  const { convertAndFormatSalary } = useCurrency();

  // 1. Keyword & Location
  const [keyword, setKeyword] = useState(initialParams?.keyword || '');
  const [location, setLocation] = useState(initialParams?.location || '');

  // 2. Job by Title
  const [titleQuery, setTitleQuery] = useState(initialParams?.title || '');

  // 3. Salary Range (Presets + Custom Range)
  const [salaryTier, setSalaryTier] = useState<string>('all');
  const [customMinSalary, setCustomMinSalary] = useState<string>('');
  const [customMaxSalary, setCustomMaxSalary] = useState<string>('');

  // 4. Job Shift
  const [selectedShift, setSelectedShift] = useState<string>('All');

  // 5. Job Type
  const [selectedType, setSelectedType] = useState(initialParams?.employmentType || 'All');
  const [selectedArrangement, setSelectedArrangement] = useState(initialParams?.arrangement || 'All');

  // 6. Job Category & Department
  const [selectedCategory, setSelectedCategory] = useState(initialParams?.category || 'All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // 7. Gender & Diversity
  const [selectedGender, setSelectedGender] = useState<string>('All');

  // 8. Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // 9. Order / Sorting
  const [sortBy, setSortBy] = useState<'recent' | 'featured' | 'popular' | 'salary_high' | 'urgent'>('recent');

  // 10. Date Posted
  const [datePostedFilter, setDatePostedFilter] = useState<string>('all');

  // 11. Degree Level
  const [selectedDegree, setSelectedDegree] = useState<string>('All');

  // Additional existing filters
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedPosterType, setSelectedPosterType] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Saved Jobs Only Filter (Requirement 7)
  const [showOnlySavedJobs, setShowOnlySavedJobs] = useState(false);

  // Layout & Mobile
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync initialParams when opened
  useEffect(() => {
    if (initialParams) {
      if (initialParams.keyword !== undefined) setKeyword(initialParams.keyword);
      if (initialParams.location !== undefined) setLocation(initialParams.location);
      if (initialParams.category !== undefined) setSelectedCategory(initialParams.category || 'All');
      if (initialParams.employmentType !== undefined) setSelectedType(initialParams.employmentType || 'All');
      if (initialParams.arrangement !== undefined) setSelectedArrangement(initialParams.arrangement || 'All');
      if (initialParams.title !== undefined) setTitleQuery(initialParams.title || '');
    }
  }, [initialParams, isOpen]);

  // Dynamic lists from dataset
  const categoriesList = useMemo(() => [
    'All',
    'Human Resources',
    'Information Technology',
    'Banking & Finance',
    'Sales & Marketing',
    'Logistics & Supply Chain',
    'Administration',
    'Engineering',
    'Healthcare'
  ], []);

  const departmentList = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      if (j.department) set.add(j.department);
    });
    return ['All', ...Array.from(set).sort()];
  }, [jobs]);

  const allSkillsList = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach(j => {
      (j.skills || []).forEach(s => set.add(s));
    });
    // Fallback prominent skills if empty
    if (set.size === 0) {
      ['TypeScript', 'React', 'Node.js', 'Python', 'CIPM', 'Labor Law', 'Payroll', 'Financial Modeling', 'B2B Sales', 'Figma', 'AWS'].forEach(s => set.add(s));
    }
    return Array.from(set).sort();
  }, [jobs]);

  const shiftsList = ['All', 'Day Shift', 'Night Shift', 'Flexible / Rotational', 'Weekend Shift'];
  const employmentTypes: ('All' | JobType)[] = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Remote', 'Hybrid', 'Internship'];
  const degreeLevels = [
    'All',
    'High School / SSCE / OND',
    "Bachelor's / B.Sc / HND",
    "Master's / M.Sc / MBA",
    'Doctorate / Ph.D',
    'Professional Certification'
  ];
  const genderOptions = [
    { id: 'All', label: 'All / Any Gender' },
    { id: 'Equal Opportunity', label: 'Equal Opportunity' },
    { id: 'Female-Preferred / Diversity Initiative', label: 'Female-Preferred / Diversity Initiative' },
    { id: 'All Genders Welcome', label: 'All Genders Welcome' }
  ];
  const salaryTiers = [
    { id: 'all', label: 'All Salaries' },
    { id: 'under1m', label: 'Under ₦1,000,000 (< $1.5k)' },
    { id: '1m-2m', label: '₦1,000,000 - ₦2,000,000 ($1.5k - $3k)' },
    { id: '2m-3.5m', label: '₦2,000,000 - ₦3,500,000 ($3k - $5k)' },
    { id: 'above3.5m', label: 'Above ₦3,500,000 (> $5k+)' }
  ];
  const dateOptions = [
    { id: 'all', label: 'Any Time' },
    { id: '24h', label: 'Past 24 Hours' },
    { id: '3d', label: 'Past 3 Days' },
    { id: '7d', label: 'Past 7 Days' },
    { id: '30d', label: 'Past 30 Days' }
  ];

  // Quick title suggestions
  const popularTitles = ['Software Engineer', 'HRBP', 'Sales', 'Product Designer', 'Finance', 'Logistics', 'Operations', 'AI'];

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Filter & Sort Logic
  const filteredAndSortedJobs = useMemo(() => {
    const list = jobs.filter(job => {
      // 0. Saved Jobs Only Filter (Requirement 7)
      if (showOnlySavedJobs && !savedJobIds.includes(job.id)) {
        return false;
      }

      // 1. General Keyword
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const match = 
          job.title.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q) ||
          job.companyName.toLowerCase().includes(q) ||
          job.category.toLowerCase().includes(q) ||
          (job.skills || []).some(s => s.toLowerCase().includes(q));
        if (!match) return false;
      }

      // 2. Job by Title (Dedicated exact/partial title search)
      if (titleQuery.trim()) {
        const t = titleQuery.toLowerCase();
        if (!job.title.toLowerCase().includes(t)) return false;
      }

      // 3. Location
      if (location.trim()) {
        if (!matchJobLocation(job.location, location)) return false;
      }

      // 4. Job Shift
      if (selectedShift !== 'All') {
        const jobShift = job.shift || 'Day Shift';
        if (jobShift !== selectedShift) return false;
      }

      // 5. Job Type & Arrangement
      if (selectedType !== 'All') {
        if (selectedType === 'Remote' && job.workArrangement !== 'Remote') return false;
        if (selectedType === 'Hybrid' && job.workArrangement !== 'Hybrid') return false;
        if (selectedType !== 'Remote' && selectedType !== 'Hybrid' && job.employmentType !== selectedType) return false;
      }

      if (selectedArrangement !== 'All' && job.workArrangement !== selectedArrangement) {
        return false;
      }

      // 6. Category & Department
      if (selectedCategory !== 'All' && job.category !== selectedCategory) {
        return false;
      }
      if (selectedDepartment !== 'All' && job.department !== selectedDepartment) {
        return false;
      }

      // 7. Gender / Diversity preference
      if (selectedGender !== 'All') {
        const jobGen = job.genderPreference || 'Equal Opportunity';
        if (selectedGender === 'Female-Preferred / Diversity Initiative' && jobGen !== 'Female-Preferred / Diversity Initiative') {
          return false;
        }
        if (selectedGender !== 'Female-Preferred / Diversity Initiative' && jobGen !== selectedGender && jobGen !== 'Equal Opportunity' && jobGen !== 'All Genders Welcome') {
          return false;
        }
      }

      // 8. Skills
      if (selectedSkills.length > 0) {
        const jobSkills = (job.skills || []).map(s => s.toLowerCase());
        const jobDesc = `${job.title} ${job.description} ${(job.requirements || []).join(' ')}`.toLowerCase();
        const matchesSkill = selectedSkills.some(skill => 
          jobSkills.some(js => js.includes(skill.toLowerCase())) || jobDesc.includes(skill.toLowerCase())
        );
        if (!matchesSkill) return false;
      }

      // 9. Degree Level
      if (selectedDegree !== 'All') {
        const jobDegree = job.degreeLevel || "Bachelor's / B.Sc / HND";
        if (jobDegree !== selectedDegree) {
          const reqStr = (job.requirements || []).join(' ').toLowerCase();
          const target = selectedDegree.toLowerCase();
          if (target.includes('doctorate') || target.includes('ph.d')) {
            if (!reqStr.includes('ph.d') && !reqStr.includes('doctorate')) return false;
          } else if (target.includes('master')) {
            if (!reqStr.includes('master')) return false;
          } else if (target.includes('school') || target.includes('ssce') || target.includes('ond')) {
            if (!reqStr.includes('ssce') && !reqStr.includes('ond') && !reqStr.includes('high school')) return false;
          } else if (target.includes('certification')) {
            if (!reqStr.includes('cipm') && !reqStr.includes('ican') && !reqStr.includes('cfa') && !reqStr.includes('acca') && !reqStr.includes('certif')) return false;
          } else {
            return false;
          }
        }
      }

      // 10. Date Posted
      if (datePostedFilter !== 'all') {
        const days = getDaysAgo(job.datePosted);
        if (datePostedFilter === '24h' && days > 1) return false;
        if (datePostedFilter === '3d' && days > 3) return false;
        if (datePostedFilter === '7d' && days > 7) return false;
        if (datePostedFilter === '30d' && days > 30) return false;
      }

      // 11. Salary Range
      const { normalizedMin, normalizedMax } = parseSalary(job.salaryRange, job.currency);
      if (salaryTier === 'under1m') {
        if (normalizedMax >= 1000000) return false;
      } else if (salaryTier === '1m-2m') {
        if (normalizedMax < 1000000 || normalizedMin > 2000000) return false;
      } else if (salaryTier === '2m-3.5m') {
        if (normalizedMax < 2000000 || normalizedMin > 3500000) return false;
      } else if (salaryTier === 'above3.5m') {
        if (normalizedMax < 3500000) return false;
      }

      if (customMinSalary.trim()) {
        const minVal = parseFloat(customMinSalary.replace(/,/g, ''));
        if (!isNaN(minVal) && normalizedMax < minVal) return false;
      }
      if (customMaxSalary.trim()) {
        const maxVal = parseFloat(customMaxSalary.replace(/,/g, ''));
        if (!isNaN(maxVal) && normalizedMin > maxVal) return false;
      }

      // 12. Experience Level
      if (selectedExperience !== 'All' && job.experienceLevel !== selectedExperience) {
        return false;
      }

      // 13. Poster Identity
      if (selectedPosterType !== 'All') {
        if (selectedPosterType === 'company') {
          const isComp = (!job.posterType || job.posterType === 'company') && job.recruiterSource !== 'Individual / Founder' && job.recruiterSource !== 'Partner Agency' && job.recruiterSource !== 'Executive Headhunter';
          if (!isComp) return false;
        } else if (selectedPosterType === 'individual') {
          const isInd = job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder';
          if (!isInd) return false;
        } else if (selectedPosterType === 'agency') {
          const isAg = job.posterType === 'agency' || job.recruiterSource === 'Partner Agency';
          if (!isAg) return false;
        } else if (selectedPosterType === 'headhunter') {
          const isHh = job.posterType === 'headhunter' || job.recruiterSource === 'Executive Headhunter';
          if (!isHh) return false;
        }
      }

      // 14. Verified only
      if (onlyVerified && !job.isVerified) {
        return false;
      }

      return true;
    });

    // Order / Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
      }
      if (sortBy === 'urgent') {
        if (a.isUrgent && !b.isUrgent) return -1;
        if (!a.isUrgent && b.isUrgent) return 1;
      }
      if (sortBy === 'popular') {
        return b.applicantCount - a.applicantCount;
      }
      if (sortBy === 'salary_high') {
        const salA = parseSalary(a.salaryRange, a.currency).normalizedMax;
        const salB = parseSalary(b.salaryRange, b.currency).normalizedMax;
        return salB - salA;
      }
      // 'recent'
      return getDaysAgo(a.datePosted) - getDaysAgo(b.datePosted);
    });
  }, [
    jobs,
    keyword,
    titleQuery,
    location,
    selectedShift,
    selectedType,
    selectedArrangement,
    selectedCategory,
    selectedDepartment,
    selectedGender,
    selectedSkills,
    selectedDegree,
    datePostedFilter,
    salaryTier,
    customMinSalary,
    customMaxSalary,
    selectedExperience,
    selectedPosterType,
    onlyVerified,
    showOnlySavedJobs,
    savedJobIds,
    sortBy
  ]);

  // Clear all filters
  const clearAllFilters = () => {
    setKeyword('');
    setLocation('');
    setTitleQuery('');
    setSalaryTier('all');
    setCustomMinSalary('');
    setCustomMaxSalary('');
    setSelectedShift('All');
    setSelectedType('All');
    setSelectedArrangement('All');
    setSelectedCategory('All');
    setSelectedDepartment('All');
    setSelectedGender('All');
    setSelectedSkills([]);
    setSortBy('recent');
    setDatePostedFilter('all');
    setSelectedDegree('All');
    setSelectedExperience('All');
    setSelectedPosterType('All');
    setOnlyVerified(false);
    setShowOnlySavedJobs(false);
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (keyword) count++;
    if (location) count++;
    if (titleQuery) count++;
    if (salaryTier !== 'all' || customMinSalary || customMaxSalary) count++;
    if (selectedShift !== 'All') count++;
    if (selectedType !== 'All') count++;
    if (selectedArrangement !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    if (selectedDepartment !== 'All') count++;
    if (selectedGender !== 'All') count++;
    if (selectedSkills.length > 0) count += selectedSkills.length;
    if (datePostedFilter !== 'all') count++;
    if (selectedDegree !== 'All') count++;
    if (selectedExperience !== 'All') count++;
    if (selectedPosterType !== 'All') count++;
    if (onlyVerified) count++;
    if (showOnlySavedJobs) count++;
    return count;
  }, [
    keyword,
    location,
    titleQuery,
    salaryTier,
    customMinSalary,
    customMaxSalary,
    selectedShift,
    selectedType,
    selectedArrangement,
    selectedCategory,
    selectedDepartment,
    selectedGender,
    selectedSkills,
    datePostedFilter,
    selectedDegree,
    selectedExperience,
    selectedPosterType,
    onlyVerified,
    showOnlySavedJobs
  ]);

  const hasActiveFilters = activeFiltersCount > 0;

  if (!isOpen) return null;

  // Reusable Filter Sidebar Content
  const renderFilterControls = () => (
    <div className="space-y-6 text-xs">
      
      {/* 0. Saved Jobs Only Toggle (Requirement 7) */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 space-y-1.5">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Bookmark className={`w-3.5 h-3.5 ${showOnlySavedJobs ? 'text-[#2563EB] dark:text-blue-400 fill-current' : 'text-slate-400'}`} />
            <span>Show Only My Saved Jobs</span>
          </span>
          <input
            type="checkbox"
            checked={showOnlySavedJobs}
            onChange={(e) => setShowOnlySavedJobs(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </label>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
          Filters list to your {savedJobIds.length} bookmarked position{savedJobIds.length === 1 ? '' : 's'}.
        </span>
      </div>

      {/* 1. Order / Sorting */}
      <div>
        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
          <ArrowDownUp className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          <span>Sort Order</span>
        </label>
        <div className="grid grid-cols-1 gap-1">
          {[
            { id: 'recent', label: 'Latest / Most Recent' },
            { id: 'featured', label: 'Featured Roles First' },
            { id: 'popular', label: 'Most Popular (High Applications)' },
            { id: 'salary_high', label: 'Highest Compensation' },
            { id: 'urgent', label: 'Urgent / Priority Roles' }
          ].map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSortBy(opt.id as any)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                sortBy === opt.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span>{opt.label}</span>
              {sortBy === opt.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Job by Title */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Job by Title</span>
          </label>
          {titleQuery && (
            <button
              type="button"
              onClick={() => setTitleQuery('')}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative mb-2">
          <input
            type="text"
            value={titleQuery}
            onChange={(e) => setTitleQuery(e.target.value)}
            placeholder="e.g. HRBP, Software Engineer..."
            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {titleQuery && (
            <button 
              type="button"
              onClick={() => setTitleQuery('')}
              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {popularTitles.map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTitleQuery(titleQuery === t ? '' : t)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                titleQuery.toLowerCase() === t.toLowerCase()
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Salary Range */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Salary Range</span>
          </label>
          {(salaryTier !== 'all' || customMinSalary || customMaxSalary) && (
            <button
              type="button"
              onClick={() => {
                setSalaryTier('all');
                setCustomMinSalary('');
                setCustomMaxSalary('');
              }}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1 mb-3">
          {salaryTiers.map(tier => (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                setSalaryTier(tier.id);
                setCustomMinSalary('');
                setCustomMaxSalary('');
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                salaryTier === tier.id && !customMinSalary && !customMaxSalary
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="truncate">{tier.label}</span>
              {salaryTier === tier.id && !customMinSalary && !customMaxSalary && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">Min (₦/equiv)</span>
            <input
              type="text"
              value={customMinSalary}
              onChange={(e) => {
                setCustomMinSalary(e.target.value);
                setSalaryTier('custom');
              }}
              placeholder="e.g. 1000000"
              className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block mb-0.5">Max (₦/equiv)</span>
            <input
              type="text"
              value={customMaxSalary}
              onChange={(e) => {
                setCustomMaxSalary(e.target.value);
                setSalaryTier('custom');
              }}
              placeholder="e.g. 3500000"
              className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 4. Job Shift */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Job Shift</span>
          </label>
          {selectedShift !== 'All' && (
            <button
              type="button"
              onClick={() => setSelectedShift('All')}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              All
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {shiftsList.map(shift => (
            <button
              key={shift}
              type="button"
              onClick={() => setSelectedShift(shift)}
              className={`px-2 py-1.5 rounded-lg border text-center transition-all cursor-pointer text-xs truncate ${
                selectedShift === shift
                  ? 'bg-[#142B4A] dark:bg-blue-600 text-white border-[#142B4A] dark:border-blue-600 font-semibold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {shift}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Job Type & Arrangement */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
          <Briefcase className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          <span>Job Type</span>
        </label>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {employmentTypes.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-2 py-1.5 rounded-lg border text-center transition-all cursor-pointer text-xs ${
                selectedType === type
                  ? 'bg-[#142B4A] dark:bg-blue-600 text-white border-[#142B4A] dark:border-blue-600 font-semibold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5 text-[11px]">Work Arrangement</label>
        <div className="grid grid-cols-2 gap-1.5">
          {['All', 'Remote', 'Hybrid', 'On-Site'].map(arr => (
            <button
              key={arr}
              type="button"
              onClick={() => setSelectedArrangement(arr)}
              className={`px-2 py-1 rounded-md border text-center transition-all cursor-pointer text-xs ${
                selectedArrangement === arr
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 border-blue-300 dark:border-blue-800 font-bold'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {arr}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Job Category & Department */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
          <Layers className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          <span>Category & Department</span>
        </label>
        <div className="mb-2">
          <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">Industry Sector</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">Department</span>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            {departmentList.map(dep => (
              <option key={dep} value={dep}>{dep === 'All' ? 'All Departments' : dep}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 7. Degree Level */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Degree Level</span>
          </label>
          {selectedDegree !== 'All' && (
            <button
              type="button"
              onClick={() => setSelectedDegree('All')}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              All
            </button>
          )}
        </div>
        <div className="space-y-1">
          {degreeLevels.map(deg => (
            <button
              key={deg}
              type="button"
              onClick={() => setSelectedDegree(deg)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                selectedDegree === deg
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="truncate">{deg}</span>
              {selectedDegree === deg && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* 8. Skills */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Skills Required</span>
            {selectedSkills.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
                {selectedSkills.length}
              </span>
            )}
          </label>
          {selectedSkills.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedSkills([])}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {allSkillsList.map(skill => {
            const isSel = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                type="button"
                onClick={() => handleToggleSkill(skill)}
                className={`px-2.5 py-1 rounded-md text-[11px] border transition-colors flex items-center gap-1 cursor-pointer ${
                  isSel
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span>{skill}</span>
                {isSel && <X className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 9. Gender & Diversity */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Gender & Diversity</span>
          </label>
          {selectedGender !== 'All' && (
            <button
              type="button"
              onClick={() => setSelectedGender('All')}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              All
            </button>
          )}
        </div>
        <div className="space-y-1">
          {genderOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedGender(opt.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                selectedGender === opt.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {selectedGender === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* 10. Date Posted */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <label className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>Date Posted</span>
          </label>
          {datePostedFilter !== 'all' && (
            <button
              type="button"
              onClick={() => setDatePostedFilter('all')}
              className="text-[11px] text-[#2563EB] dark:text-blue-400 hover:underline cursor-pointer"
            >
              All
            </button>
          )}
        </div>
        <div className="space-y-1">
          {dateOptions.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDatePostedFilter(opt.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                datePostedFilter === opt.id
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{opt.label}</span>
              {datePostedFilter === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* 11. Hiring Entity */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="font-bold text-slate-800 dark:text-slate-200 block mb-2">Hiring Entity</label>
        <div className="space-y-1">
          {[
            { id: 'All', label: 'All Hiring Entities', icon: Building2 },
            { id: 'company', label: 'Direct Employers & Companies', icon: Building2 },
            { id: 'individual', label: 'Individuals & Founders', icon: User },
            { id: 'agency', label: 'Recruiters & Agencies', icon: Users },
            { id: 'headhunter', label: 'Executive Headhunters', icon: Target },
          ].map((item) => {
            const isSel = selectedPosterType === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedPosterType(item.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                  isSel
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </span>
                {isSel && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 12. Verified Employers Only */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-semibold">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-lime-600 focus:ring-lime-500"
          />
          <span className="flex items-center gap-1.5 text-lime-700 dark:text-lime-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verified Vacancies Only</span>
          </span>
        </label>
      </div>

    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto transition-colors duration-200">
      <div 
        className="bg-[#F8FAFC] dark:bg-[#090d16] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-7xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between gap-4 shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#142B4A] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#142B4A] dark:text-white">NextSoftHR Job Directory</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Expanded Directory & Filters
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="tabular-nums font-bold text-[#2563EB] dark:text-blue-400">{filteredAndSortedJobs.length}</span> Verified Vacancies Matching
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer relative"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Search Bar Strip */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 shrink-0 transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* General keyword */}
            <div className="sm:col-span-5 relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search keywords, skills, or company..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
              {keyword && (
                <button onClick={() => setKeyword('')} className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Direct Job Title Quick Search */}
            <div className="sm:col-span-3 relative flex items-center">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
                placeholder="Job by title / role..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
              />
              {titleQuery && (
                <button onClick={() => setTitleQuery('')} className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Country & Location */}
            <div className="sm:col-span-3 relative flex items-center">
              <CountryLocationSelector
                value={location}
                onChange={setLocation}
                placeholder="Any location worldwide..."
                variant="compact"
                className="w-full"
              />
            </div>

            {/* View Layout Toggle */}
            <div className="sm:col-span-1 flex items-center justify-end">
              <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewLayout('grid')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${viewLayout === 'grid' ? 'bg-white dark:bg-slate-700 shadow-2xs text-[#2563EB] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewLayout('list')}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${viewLayout === 'list' ? 'bg-white dark:bg-slate-700 shadow-2xs text-[#2563EB] dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px] mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Active ({activeFiltersCount}):
              </span>

              {keyword && (
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-400 rounded-md flex items-center gap-1 text-[11px]">
                  Keyword: "{keyword}"
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setKeyword('')} />
                </span>
              )}

              {titleQuery && (
                <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400 rounded-md flex items-center gap-1 text-[11px]">
                  Title: "{titleQuery}"
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setTitleQuery('')} />
                </span>
              )}

              {location && (
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-400 rounded-md flex items-center gap-1 text-[11px]">
                  Location: {location}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setLocation('')} />
                </span>
              )}

              {selectedShift !== 'All' && (
                <span className="px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-400 rounded-md flex items-center gap-1 text-[11px]">
                  Shift: {selectedShift}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedShift('All')} />
                </span>
              )}

              {salaryTier !== 'all' && (
                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 rounded-md flex items-center gap-1 text-[11px]">
                  Salary: {salaryTiers.find(t => t.id === salaryTier)?.label || salaryTier}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSalaryTier('all')} />
                </span>
              )}

              {(customMinSalary || customMaxSalary) && (
                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 rounded-md flex items-center gap-1 text-[11px]">
                  Salary: {customMinSalary ? `₦${customMinSalary}+` : ''} {customMaxSalary ? `up to ₦${customMaxSalary}` : ''}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => { setCustomMinSalary(''); setCustomMaxSalary(''); }} />
                </span>
              )}

              {selectedType !== 'All' && (
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-400 rounded-md flex items-center gap-1 text-[11px]">
                  Type: {selectedType}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedType('All')} />
                </span>
              )}

              {selectedArrangement !== 'All' && (
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-400 rounded-md flex items-center gap-1 text-[11px]">
                  Arrangement: {selectedArrangement}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedArrangement('All')} />
                </span>
              )}

              {selectedCategory !== 'All' && (
                <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] dark:text-blue-400 rounded-md flex items-center gap-1 text-[11px]">
                  Sector: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedCategory('All')} />
                </span>
              )}

              {selectedDepartment !== 'All' && (
                <span className="px-2 py-0.5 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-900 text-sky-700 dark:text-sky-400 rounded-md flex items-center gap-1 text-[11px]">
                  Dept: {selectedDepartment}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedDepartment('All')} />
                </span>
              )}

              {selectedDegree !== 'All' && (
                <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-400 rounded-md flex items-center gap-1 text-[11px]">
                  Degree: {selectedDegree}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedDegree('All')} />
                </span>
              )}

              {selectedGender !== 'All' && (
                <span className="px-2 py-0.5 bg-fuchsia-50 dark:bg-fuchsia-950/60 border border-fuchsia-200 dark:border-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-300 rounded-md flex items-center gap-1 text-[11px]">
                  Gender: {selectedGender}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedGender('All')} />
                </span>
              )}

              {selectedSkills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300 rounded-md flex items-center gap-1 text-[11px]">
                  Skill: {skill}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => handleToggleSkill(skill)} />
                </span>
              ))}

              {datePostedFilter !== 'all' && (
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-md flex items-center gap-1 text-[11px]">
                  Posted: {dateOptions.find(d => d.id === datePostedFilter)?.label}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setDatePostedFilter('all')} />
                </span>
              )}

              {selectedPosterType !== 'All' && (
                <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 text-purple-700 dark:text-purple-400 rounded-md flex items-center gap-1 text-[11px]">
                  Poster: {selectedPosterType}
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setSelectedPosterType('All')} />
                </span>
              )}

              {onlyVerified && (
                <span className="px-2 py-0.5 bg-lime-50 dark:bg-lime-950/60 border border-lime-200 dark:border-lime-800 text-lime-800 dark:text-lime-300 rounded-md flex items-center gap-1 text-[11px]">
                  Verified Only
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setOnlyVerified(false)} />
                </span>
              )}

              {showOnlySavedJobs && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 text-[#2563EB] dark:text-blue-300 rounded-md flex items-center gap-1 text-[11px] font-bold">
                  <Bookmark className="w-3 h-3 fill-current" />
                  <span>Only Saved Jobs ({savedJobIds.length})</span>
                  <X className="w-3 h-3 cursor-pointer hover:opacity-80" onClick={() => setShowOnlySavedJobs(false)} />
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-[11px] text-red-600 dark:text-red-400 hover:underline font-semibold ml-2 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Body: Sidebar + Job Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Filter Sidebar (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-5 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 h-fit text-xs transition-colors sticky top-0 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
                <span>Refine Vacancies</span>
              </span>
              {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-[#2563EB] dark:text-blue-400 hover:underline font-semibold text-xs cursor-pointer">
                  Reset All
                </button>
              )}
            </div>

            {renderFilterControls()}
          </div>

          {/* Right Column: Search Results */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* Results count & Saved Jobs Filter & Alert button & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span>
                  Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredAndSortedJobs.length}</strong> matching opportunities
                </span>

                {/* Requirement 7: Show Only My Saved Jobs Toggle */}
                <button
                  type="button"
                  onClick={() => setShowOnlySavedJobs(prev => !prev)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    showOnlySavedJobs
                      ? 'bg-[#2563EB] text-white shadow-xs ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                  }`}
                  title="Filter current job list to show only saved jobs"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${showOnlySavedJobs ? 'fill-current text-white' : 'text-slate-400'}`} />
                  <span>Show Only My Saved Jobs</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    showOnlySavedJobs ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {savedJobIds.length}
                  </span>
                </button>

                {onOpenJobAlerts && (
                  <button
                    onClick={() => onOpenJobAlerts({ 
                      keyword: titleQuery || keyword, 
                      location, 
                      category: selectedCategory !== 'All' ? selectedCategory : undefined 
                    })}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#2563EB] dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer"
                    title="Get email alerts for this search query"
                  >
                    <Bell className="w-3 h-3 text-[#2563EB] dark:text-blue-400" />
                    <span>Get Alerts for this Search</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px]">Order:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-200 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="featured">Featured First</option>
                  <option value="popular">Most Applications</option>
                  <option value="salary_high">Highest Salary</option>
                  <option value="urgent">Urgent Openings</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedJobs.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  {showOnlySavedJobs ? 'No saved jobs match your search' : 'No matching vacancies found'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  {showOnlySavedJobs 
                    ? `You currently have ${savedJobIds.length} saved job${savedJobIds.length === 1 ? '' : 's'}. None of them match the other active filters, or you haven't bookmarked roles matching this query yet.`
                    : 'No roles match all active filters. Try loosening salary tiers, shift requirements, or degree level to explore more opportunities.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {showOnlySavedJobs ? (
                    <button
                      onClick={() => setShowOnlySavedJobs(false)}
                      className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Show All Vacancies ({jobs.length})
                    </button>
                  ) : (
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  )}
                  {onOpenJobAlerts && (
                    <button
                      onClick={() => onOpenJobAlerts({ 
                        keyword: titleQuery || keyword, 
                        location, 
                        category: selectedCategory !== 'All' ? selectedCategory : undefined 
                      })}
                      className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Notify Me When This Role Posts</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className={viewLayout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
                {filteredAndSortedJobs.map((job) => {
                  const isSaved = savedJobIds.includes(job.id);
                  const shift = job.shift || 'Day Shift';
                  const degree = job.degreeLevel || "Bachelor's / B.Sc / HND";
                  const gender = job.genderPreference || 'Equal Opportunity';
                  
                  return (
                    <div
                      key={job.id}
                      onClick={() => onSelectJob(job)}
                      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 hover:border-blue-300 dark:hover:border-blue-500/60 hover:shadow-md dark:hover:shadow-black/60 transition-all flex flex-col justify-between cursor-pointer group ${
                        viewLayout === 'list' ? 'sm:flex-row sm:items-center gap-4' : ''
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#142B4A] dark:text-white font-bold text-xs tracking-wider">
                              {job.companyInitials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.companyName}</span>
                                {job.isVerified && <CheckCircle className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />}
                                {job.posterType === 'individual' || job.recruiterSource === 'Individual / Founder' ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-lime-100 dark:bg-lime-950/70 text-lime-800 dark:text-lime-300">
                                    👤 Individual
                                  </span>
                                ) : job.posterType === 'agency' || job.recruiterSource === 'Partner Agency' ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                                    🤝 Agency
                                  </span>
                                ) : job.posterType === 'headhunter' || job.recruiterSource === 'Executive Headhunter' ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300">
                                    🎯 Headhunter
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                                    🏢 Employer
                                  </span>
                                )}
                                {job.isUrgent && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 flex items-center gap-0.5">
                                    <Zap className="w-2.5 h-2.5" /> Urgent
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">{job.department}</span>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleSaveJob(job.id);
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isSaved 
                                ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60' 
                                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-[#142B4A] dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors mt-3">
                          {job.title}
                        </h3>

                        {/* Location, Arrangement, Employment Type */}
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                            {job.location}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{job.workArrangement}</span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span>{job.employmentType}</span>
                        </div>

                        {/* 10 Filter Metadata Badges: Shift, Degree Level, Gender/Diversity */}
                        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                          {/* Shift Badge */}
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-slate-400" />
                            {shift}
                          </span>

                          {/* Degree Level Badge */}
                          <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 border border-amber-200/60 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-[10px] font-semibold flex items-center gap-1">
                            <GraduationCap className="w-2.5 h-2.5" />
                            {degree}
                          </span>

                          {/* Gender Preference Badge */}
                          {gender === 'Female-Preferred / Diversity Initiative' ? (
                            <span className="px-2 py-0.5 rounded bg-fuchsia-50 dark:bg-fuchsia-950/50 border border-fuchsia-200/60 dark:border-fuchsia-900/60 text-fuchsia-800 dark:text-fuchsia-300 text-[10px] font-semibold flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              Diversity Initiative
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium">
                              {gender}
                            </span>
                          )}
                        </div>

                        {/* Skills Chips */}
                        {job.skills && job.skills.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1 items-center">
                            {job.skills.slice(0, 4).map(skill => (
                              <span 
                                key={skill}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                                  selectedSkills.includes(skill)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                                +{job.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      <div className={`mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 ${
                        viewLayout === 'list' ? 'sm:mt-0 sm:pt-0 sm:border-0 sm:flex-col sm:items-end sm:shrink-0' : ''
                      }`}>
                        <div>
                          <div className="text-xs font-bold text-[#142B4A] dark:text-white tabular-nums">
                            {convertAndFormatSalary(job.salaryRange, job.currency)}
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            Posted {job.datePosted} · {job.applicantCount} applicants
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onApplyDirect(job);
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex justify-end animate-in fade-in lg:hidden">
          <div 
            className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Filter Vacancies</h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-1">
              {renderFilterControls()}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-xl bg-[#2563EB] text-white font-semibold text-xs hover:bg-[#1D4ED8]"
              >
                View {filteredAndSortedJobs.length} Roles
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
