import React, { useState } from 'react';
import { Globe, ArrowRight, MapPin } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';

interface PartnersByCountryProps {
  onSelectCountry: (countryName: string) => void;
}

export const PartnersByCountry: React.FC<PartnersByCountryProps> = ({ onSelectCountry }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'africa' | 'international'>('all');

  const filteredCountries = COUNTRIES_DATA.filter((c) => {
    if (activeTab === 'africa') return c.region === 'Africa';
    if (activeTab === 'international') return c.region === 'International';
    return true;
  });

  const handleCountryClick = (name: string) => {
    onSelectCountry(name);
    const el = document.getElementById('directory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="countries" className="py-16 md:py-24 bg-[#f8fafc] dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>TERRITORIAL COVERAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            Explore Partners by Country
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400">
            Find NextSofthr partners equipped with in-depth knowledge of local labor laws, statutory tax frameworks, and business compliance requirements in your country.
          </p>

          {/* Region Tabs */}
          <div className="mt-6 inline-flex items-center bg-slate-200/80 dark:bg-[#0a1c3b] p-1 rounded-xl border border-transparent dark:border-slate-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'all' 
                  ? 'bg-white dark:bg-[#0c2b64] text-[#0c2b64] dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Hubs ({COUNTRIES_DATA.length})
            </button>
            <button
              onClick={() => setActiveTab('africa')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'africa' 
                  ? 'bg-white dark:bg-[#0c2b64] text-[#0c2b64] dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Africa ({COUNTRIES_DATA.filter(c => c.region === 'Africa').length})
            </button>
            <button
              onClick={() => setActiveTab('international')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'international' 
                  ? 'bg-white dark:bg-[#0c2b64] text-[#0c2b64] dark:text-white shadow-xs' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              International ({COUNTRIES_DATA.filter(c => c.region === 'International').length})
            </button>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredCountries.map((c) => (
            <div
              key={c.id}
              onClick={() => handleCountryClick(c.name)}
              className="bg-white dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/80 dark:hover:border-[#c8f526]/80 hover:shadow-md p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {c.flag}
                </div>
                <h3 className="text-sm font-bold text-[#0c2b64] dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#c8f526] line-clamp-1 transition-colors">
                  {c.name}
                </h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {c.partnerCount} {c.partnerCount === 1 ? 'Partner' : 'Partners'}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-blue-900 dark:text-[#c8f526] group-hover:text-[#c8f526]">
                <span>View Partners</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
