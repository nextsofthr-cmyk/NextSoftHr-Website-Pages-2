import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Briefcase, 
  Sparkles,
  Users
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onSearch: (filters: {
    query: string;
    country: string;
    city: string;
    industry: string;
    partnerType: string;
  }) => void;
  onBecomePartnerClick: () => void;
  onOpenAiMatch?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onBecomePartnerClick, onOpenAiMatch }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedPartnerType, setSelectedPartnerType] = useState('');

  // Dynamically derive cities for selected country
  const countryObj = COUNTRIES_DATA.find(c => c.name === selectedCountry);
  const cities = countryObj ? countryObj.keyCities : [
    'Lagos', 'Nairobi', 'Accra', 'Johannesburg', 'Kigali', 'Cairo', 'London', 'Dubai'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      query,
      country: selectedCountry,
      city: selectedCity,
      industry: selectedIndustry,
      partnerType: selectedPartnerType
    });
    // Scroll smoothly to directory
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const setQuickFilter = (presetQuery: string, presetCountry: string) => {
    setQuery(presetQuery);
    setSelectedCountry(presetCountry);
    onSearch({
      query: presetQuery,
      country: presetCountry,
      city: '',
      industry: '',
      partnerType: ''
    });
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50/40 to-white dark:bg-[#061124] overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] bg-blue-600/5 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-10 right-10 w-72 h-72 bg-[#c8f526]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 dark:bg-blue-950/80 border border-blue-200 dark:border-[#c8f526]/40 text-[#0c2b64] dark:text-[#c8f526] text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-700 dark:text-[#c8f526]" />
            <span className="uppercase tracking-wider">{t('hero.badge', undefined, 'OFFICIAL GLOBAL ECOSYSTEM DIRECTORY')}</span>
          </div>
        </div>

        {/* Main Heading - Explicitly Black text and description */}
        <div className="text-center mt-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-black dark:text-white leading-[1.15]">
            {t('hero.title_prefix', undefined, 'Connect With Certified')}{' '}
            <span className="text-black dark:text-[#c8f526]">{t('hero.title_highlight', undefined, 'NextSofthr Partners')}</span>{' '}
            {t('hero.title_suffix', undefined, 'Across Africa & Worldwide')}
          </h1>
          <p className="mt-5 text-base sm:text-xl text-black dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {t('hero.subtitle', undefined, 'Accelerate your HR, payroll, attendance, and ERP transformation. Find accredited implementation consultants, system integrators, and managed payroll service providers vetted for excellence.')}
          </p>
        </div>

        {/* Search Interface Container */}
        <div className="mt-10 max-w-5xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white dark:bg-[#0a1c3b]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/40"
          >
            {/* Top Row: General Text Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5 text-[#0c2b64] dark:text-[#c8f526]" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('hero.search_placeholder', undefined, 'Search by partner name, specialization, or country...')}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl md:rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0c2b64] dark:focus:border-[#c8f526] focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-[#c8f526]/30 text-sm md:text-base transition-all"
              />
            </div>

            {/* Bottom Row: 4 Specialized Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3.5">
              
              {/* Country Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-400 mb-1 ml-1">
                  Country
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedCity(''); // Reset city when country changes
                    }}
                    className="w-full bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs md:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0c2b64] dark:focus:border-[#c8f526] focus:ring-1 focus:ring-[#0c2b64] dark:focus:ring-[#c8f526] appearance-none"
                  >
                    <option value="">{t('hero.all_countries', undefined, 'All Countries')}</option>
                    <optgroup label="Africa">
                      {COUNTRIES_DATA.filter(c => c.region === 'Africa').map(c => (
                        <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {COUNTRIES_DATA.filter(c => c.region === 'International').map(c => (
                        <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* City / Location Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-400 mb-1 ml-1">
                  City / Location
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs md:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0c2b64] dark:focus:border-[#c8f526] focus:ring-1 focus:ring-[#0c2b64] dark:focus:ring-[#c8f526] appearance-none"
                  >
                    <option value="">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <Building className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Industry Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-400 mb-1 ml-1">
                  Industry
                </label>
                <div className="relative">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs md:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0c2b64] dark:focus:border-[#c8f526] focus:ring-1 focus:ring-[#0c2b64] dark:focus:ring-[#c8f526] appearance-none"
                  >
                    <option value="">All Industries</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail & Supermarkets</option>
                    <option value="Financial Services">Financial Services & FinTech</option>
                    <option value="Agriculture">Agriculture & Farming</option>
                    <option value="Logistics">Logistics & Transportation</option>
                    <option value="Hospitality">Hospitality & Restaurants</option>
                    <option value="Healthcare">Healthcare & Hospitals</option>
                    <option value="Education">Education & Universities</option>
                    <option value="Technology">Technology & Software</option>
                    <option value="NGOs">NGOs & Development</option>
                  </select>
                  <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Partner Type Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-400 mb-1 ml-1">
                  Partner Type
                </label>
                <div className="relative">
                  <select
                    value={selectedPartnerType}
                    onChange={(e) => setSelectedPartnerType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#061227] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs md:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0c2b64] dark:focus:border-[#c8f526] focus:ring-1 focus:ring-[#0c2b64] dark:focus:ring-[#c8f526] appearance-none"
                  >
                    <option value="">{t('hero.all_services', undefined, 'All Implementation Services')}</option>
                    <option value="Implementation Partner">Implementation Partner</option>
                    <option value="HR Consultant">HR Consultant</option>
                    <option value="Payroll Specialist">Payroll Specialist / Consultant</option>
                    <option value="Accounting Firm">Accounting Firm</option>
                    <option value="Technology Partner">Technology Partner / IT Company</option>
                    <option value="System Integrator">System Integrator</option>
                    <option value="Business Consultant">Business Consultant</option>
                    <option value="Software Consultant">Software Consultant</option>
                  </select>
                  <Users className="w-4 h-4 text-slate-500 dark:text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* CTA Action Row */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <span className="font-bold text-[#0c2b64] dark:text-[#c8f526] mr-1">Popular:</span>
                <button
                  type="button"
                  onClick={() => setQuickFilter('Lagos', 'Nigeria')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#061227] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  🇳🇬 Lagos HR & Payroll
                </button>
                <button
                  type="button"
                  onClick={() => setQuickFilter('Nairobi', 'Kenya')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#061227] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  🇰🇪 Nairobi Tech
                </button>
                <button
                  type="button"
                  onClick={() => setQuickFilter('Johannesburg', 'South Africa')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#061227] hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  🇿🇦 Johannesburg
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                {onOpenAiMatch && (
                  <button
                    type="button"
                    onClick={onOpenAiMatch}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs md:text-sm shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#c8f526] animate-pulse" />
                    <span>{t('hero.ai_match_btn', undefined, 'AI Match Assistant')}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onBecomePartnerClick}
                  className="flex-1 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/20 hover:border-[#0c2b64] dark:hover:border-[#c8f526] text-slate-800 dark:text-white hover:text-[#0c2b64] dark:hover:text-[#c8f526] font-bold text-xs md:text-sm transition-colors text-center cursor-pointer"
                >
                  {t('nav.become_partner', undefined, 'Become a Partner')}
                </button>
                <button
                  type="submit"
                  id="hero-find-partner-submit"
                  className="flex-1 sm:w-auto px-5 py-2.5 rounded-xl bg-[#0c2b64] hover:bg-blue-800 dark:bg-[#c8f526] dark:hover:bg-[#b5e01b] text-white dark:text-[#071938] font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('hero.search_btn', undefined, 'Search Partners')}</span>
                </button>
              </div>

            </div>
          </form>
        </div>

        {/* Global Key Trust Metrics Bar - All numbers bold black in light mode, vibrant in dark mode */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0a1c3b]/60 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-[#c8f526]">240+</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              {t('hero.stat_partners', undefined, 'Accredited Partners')}
            </div>
          </div>

          {/* Metric 2: 20+ African & Global Markets */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0a1c3b]/60 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-[#c8f526]">20+</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              {t('hero.stat_countries', undefined, 'African & Global Markets')}
            </div>
          </div>

          {/* Metric 3: 1,800+ Enterprise Deployments */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0a1c3b]/60 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-[#c8f526]">1,800+</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              {t('hero.stat_deployments', undefined, 'Enterprise Deployments')}
            </div>
          </div>

          {/* Metric 4: 99.4% Client Satisfaction */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0a1c3b]/60 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-[#c8f526]">99.4%</div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 font-semibold">
              {t('hero.stat_satisfaction', undefined, 'Client Satisfaction')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
