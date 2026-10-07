import React, { useState } from 'react';
import { Globe, MapPin, Sparkles, CheckCircle2, DollarSign, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GlobalNetworkMap: React.FC = () => {
  const { strings } = useLanguage();
  const net = strings.network;
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'west-africa' | 'east-africa' | 'south-africa' | 'global'>('all');

  const partnerHubs = [
    { name: 'Nigeria', city: 'Lagos & Abuja', region: 'west-africa', flag: '🇳🇬', currency: 'NGN (₦)', tax: 'PAYE, NHF, Pension' },
    { name: 'Ghana', city: 'Accra', region: 'west-africa', flag: '🇬🇭', currency: 'GHS (GH₵)', tax: 'GRA, SSNIT, Tier 1-3' },
    { name: 'Kenya', city: 'Nairobi', region: 'east-africa', flag: '🇰🇪', currency: 'KES (KSh)', tax: 'KRA, NSSF, NHIF' },
    { name: 'South Africa', city: 'Johannesburg & Cape Town', region: 'south-africa', flag: '🇿🇦', currency: 'ZAR (R)', tax: 'SARS, UIF, SDL' },
    { name: 'Uganda', city: 'Kampala', region: 'east-africa', flag: '🇺🇬', currency: 'UGX', tax: 'URA, NSSF' },
    { name: 'Tanzania', city: 'Dar es Salaam', region: 'east-africa', flag: '🇹🇿', currency: 'TZS', tax: 'TRA, WCF, NSSF' },
    { name: 'Rwanda', city: 'Kigali', region: 'east-africa', flag: '🇷🇼', currency: 'RWF', tax: 'RRA, RSSB' },
    { name: 'Zambia', city: 'Lusaka', region: 'south-africa', flag: '🇿🇲', currency: 'ZMW', tax: 'ZRA, NAPSA' },
    { name: 'Zimbabwe', city: 'Harare', region: 'south-africa', flag: '🇿🇼', currency: 'USD / ZiG', tax: 'ZIMRA, NSSA' },
    { name: 'Egypt', city: 'Cairo', region: 'global', flag: '🇪🇬', currency: 'EGP', tax: 'ETA, Social Insurance' },
    { name: 'Morocco', city: 'Casablanca', region: 'global', flag: '🇲🇦', currency: 'MAD', tax: 'DGI, CNSS' },
    { name: 'Senegal', city: 'Dakar', region: 'west-africa', flag: '🇸🇳', currency: 'XOF', tax: 'DGID, IPRES' },
    { name: 'Côte d’Ivoire', city: 'Abidjan', region: 'west-africa', flag: '🇨🇮', currency: 'XOF', tax: 'DGI, CNPS' },
    { name: 'Cameroon', city: 'Douala & Yaoundé', region: 'west-africa', flag: '🇨🇲', currency: 'XAF', tax: 'DGI, CNPS' },
    { name: 'United Kingdom', city: 'London', region: 'global', flag: '🇬🇧', currency: 'GBP (£)', tax: 'HMRC RTI, Workplace Pension' },
    { name: 'United States', city: 'New York & Delaware', region: 'global', flag: '🇺🇸', currency: 'USD ($)', tax: 'Federal, State, W-2 & 1099' },
    { name: 'Canada', city: 'Toronto', region: 'global', flag: '🇨🇦', currency: 'CAD ($)', tax: 'CRA, CPP, EI' },
    { name: 'UAE', city: 'Dubai', region: 'global', flag: '🇦🇪', currency: 'AED', tax: 'WPS, MOHRE Compliant' },
    { name: 'Europe', city: 'Pan-European Hubs', region: 'global', flag: '🇪🇺', currency: 'EUR (€)', tax: 'GDPR & Cross-Border Rails' },
  ];

  const filteredHubs = selectedRegion === 'all' 
    ? partnerHubs 
    : partnerHubs.filter(h => h.region === selectedRegion);

  return (
    <section id="network" className="py-24 bg-white dark:bg-[#051329] border-t border-slate-200 dark:border-blue-900/60 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-[#B8F010]/40 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>{net.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {net.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {net.subtitle}
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Global Hubs' },
            { id: 'west-africa', label: 'West Africa (Nigeria, Ghana, Senegal...)' },
            { id: 'east-africa', label: 'East Africa (Kenya, Uganda, Rwanda...)' },
            { id: 'south-africa', label: 'Southern Africa (South Africa, Zambia...)' },
            { id: 'global', label: 'Global & Diaspora (UK, US, Canada, UAE...)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRegion(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedRegion === tab.id
                  ? 'bg-[#B8F010] text-[#040E1F] shadow-md shadow-[#B8F010]/20'
                  : 'bg-slate-100 dark:bg-[#071D3E] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-blue-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Market Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {filteredHubs.map((hub, idx) => (
            <div
              key={idx}
              className="group p-4 rounded-xl bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-800/80 hover:border-blue-500 dark:hover:border-[#B8F010] transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{hub.flag}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                    {hub.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-blue-950 text-blue-700 dark:text-[#B8F010] border border-slate-200 dark:border-blue-800">
                  {hub.currency}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-blue-200 mb-2">
                Hub: <span className="text-slate-800 dark:text-slate-300 font-medium">{hub.city}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate max-w-[170px]" title={hub.tax}>Rules: {hub.tax}</span>
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-[#B8F010] animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Country Compliance Guarantee Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-[#0B254A] to-blue-950 dark:from-[#071D3E] dark:via-[#0B254A] dark:to-[#071D3E] border border-blue-700/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B8F010]/20 border border-[#B8F010] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#B8F010]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Cross-Border Payroll & Statutory Tax Engine
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 dark:text-slate-300 leading-relaxed max-w-2xl">
                Empower your corporate clients to run payroll across multiple African jurisdictions or international subsidiaries in local currencies with unified banking payment files.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold px-3 py-2 rounded-lg bg-blue-950 text-[#B8F010] border border-blue-800">
              NGN • KES • GHS • ZAR • USD • GBP • EUR • AED
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
