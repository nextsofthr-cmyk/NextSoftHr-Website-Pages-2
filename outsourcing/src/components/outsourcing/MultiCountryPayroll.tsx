import React, { useState } from 'react';
import { 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Coins, 
  FileSpreadsheet, 
  ShieldCheck, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { AFRICAN_COUNTRIES } from '../../data/mockData';
import { CountryConfig } from '../../types';

interface MultiCountryPayrollProps {
  onOpenLeadModal: (service?: string) => void;
}

export const MultiCountryPayroll: React.FC<MultiCountryPayrollProps> = ({ onOpenLeadModal }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(AFRICAN_COUNTRIES[0]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0A1E4A] via-[#0F2D6B] to-[#0A1E4A] text-white pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-lime-400 uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Pan-African & Global Expansion</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            “Built for Africa. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-400">
              Designed to Scale Globally.”
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Run multi-entity, multi-currency payroll across major African markets from one unified platform. Automated calculations for local taxes, statutory social funds, and banking disbursements.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenLeadModal('Multi-Country African Payroll')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-lime-400 to-[#9AE616] hover:from-lime-300 hover:to-lime-400 text-slate-950 font-bold text-base rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Explore Multi-Country Solutions</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive African Map Visualization & Country Inspector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Regional Coverage</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive African Payroll Jurisdictions
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Click any country below to inspect supported statutory authorities, payroll currencies, and verified filing schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Countries Selector / Map list */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 space-y-2 lg:col-span-1 max-h-[580px] overflow-y-auto">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Supported African Markets</span>
              <span className="text-lime-700 font-mono text-[11px]">{AFRICAN_COUNTRIES.length} Live</span>
            </div>

            {AFRICAN_COUNTRIES.map((country) => {
              const isSelected = selectedCountry.id === country.id;
              return (
                <div
                  key={country.id}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{country.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{country.currency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full">
                      {country.activeClients} Clients
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Country Detailed Statutory Inspector */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedCountry.name} Payroll Engine</h3>
                    <div className="text-xs text-slate-500">
                      Standard Currency: <strong className="text-slate-900 font-mono">{selectedCountry.currency}</strong> · Filing Cycle: {selectedCountry.statutoryFilingDay}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal(`${selectedCountry.name} Payroll`)}
                  className="px-4 py-2 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Get {selectedCountry.name} Tax Guide
                </button>
              </div>

              {/* Statutory Framework Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-blue-900 uppercase">PAYE Income Tax Formula</div>
                  <p className="text-slate-700 leading-relaxed">{selectedCountry.payeRules}</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-blue-900 uppercase">Statutory Pension & Social Funds</div>
                  <p className="text-slate-700 leading-relaxed">{selectedCountry.pensionRules}</p>
                </div>
              </div>

              {/* Supported Statutory Bodies */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase">Direct Remittance Authorities</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.statutoryBodies.map((body, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-[#0F2D6B] font-semibold px-3 py-1.5 rounded-lg border border-blue-200">
                      {body}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Levies */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase">Applicable Levies & Employer Contributions</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCountry.additionalLevies.map((levy, i) => (
                    <span key={i} className="text-xs bg-lime-50 text-lime-900 font-medium px-3 py-1.5 rounded-lg border border-lime-300">
                      {levy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supported Regional Hubs */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase">Supported Metropolitan Centers</span>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{selectedCountry.supportedCities.join(' · ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Automatic cross-border fx disbursement available</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fully Configured & Operational
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
