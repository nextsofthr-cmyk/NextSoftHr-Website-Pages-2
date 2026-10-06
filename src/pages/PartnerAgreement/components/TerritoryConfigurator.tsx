import React, { useState } from 'react';
import { COUNTRY_SCHEDULES, DEFAULT_TERRITORY_CONFIG } from '../data/partnerData';
import { TerritoryConfig } from '../types/agreement';
import { Globe, Shield, MapPin, Scale, Check, Copy } from 'lucide-react';

export const TerritoryConfigurator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<string>('Nigeria & West Africa');
  const [config, setConfig] = useState<TerritoryConfig>(DEFAULT_TERRITORY_CONFIG);
  const [isCopied, setIsCopied] = useState(false);

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    const presetData = COUNTRY_SCHEDULES[presetName];
    if (presetData) {
      setConfig((prev) => ({
        ...prev,
        country: presetName,
        contractingEntity: presetData.contractingEntity,
        governingLaw: presetData.governingLaw,
        arbitrationVenue: `${presetData.arbitrationRules} (${presetData.venue})`,
        specialConditions: presetData.regulatoryNotes
      }));
    }
  };

  const copySchedule = () => {
    const text = `NEXTSOFTHR SCHEDULE C - TERRITORY & JURISDICTION SCHEDULE\n
Authorized Territory: ${config.country} (${config.region})
State/Province: ${config.stateProvince}
City: ${config.city}
Authorized Vertical Industry: ${config.industry}
Target Customer Segment: ${config.customerSegment}
Approved Product Scope: ${config.product}
Exclusivity Status: ${config.exclusivity}
Lead Protection Period: ${config.leadProtectionPeriodDays} Calendar Days
NextSoftHR Contracting Entity: ${config.contractingEntity}
Governing Law: ${config.governingLaw}
Arbitration Venue & Rules: ${config.arbitrationVenue}
Special Conditions: ${config.specialConditions}`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="territory" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            <span>Jurisdiction & Geography</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Schedule C Specification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Territory Scope & Multi-Jurisdiction Schedule
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            NextSoftHR adapts to international legal frameworks without forcing a single foreign jurisdiction. Configure your geographic territory, market segment focus, local contracting entity, and governing legal forum.
          </p>
        </div>

        {/* Non-Exclusivity Legal Callout */}
        <div className="mt-6 p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block mb-0.5">Statutory Non-Exclusivity Rule:</span>
            Territory authorization does not automatically create exclusive commercial rights. Unless explicitly executed in a bilateral Master Distributor Schedule signed by an executive officer of NextSoftHR, all channel appointments remain non-exclusive under Clause 11.
          </div>
        </div>

        {/* Region Selector Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Select Regional Hub:</span>
          </span>
          {Object.keys(COUNTRY_SCHEDULES).map((presetKey) => (
            <button
              key={presetKey}
              onClick={() => handlePresetChange(presetKey)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedPreset === presetKey
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {presetKey}
            </button>
          ))}
        </div>

        {/* Configurable Form Fields and Generated Schedule View */}
        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* Form Fields Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Configurable Territory Parameters
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Country:</label>
                <input
                  type="text"
                  value={config.country}
                  onChange={(e) => setConfig({ ...config, country: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Region:</label>
                <input
                  type="text"
                  value={config.region}
                  onChange={(e) => setConfig({ ...config, region: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">State / Province:</label>
                <input
                  type="text"
                  value={config.stateProvince}
                  onChange={(e) => setConfig({ ...config, stateProvince: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / Metro:</label>
                <input
                  type="text"
                  value={config.city}
                  onChange={(e) => setConfig({ ...config, city: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vertical Industry Focus:</label>
                <input
                  type="text"
                  value={config.industry}
                  onChange={(e) => setConfig({ ...config, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Segment:</label>
                <input
                  type="text"
                  value={config.customerSegment}
                  onChange={(e) => setConfig({ ...config, customerSegment: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Scope:</label>
                <input
                  type="text"
                  value={config.product}
                  onChange={(e) => setConfig({ ...config, product: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lead Protection Period:</label>
                <select
                  value={config.leadProtectionPeriodDays}
                  onChange={(e) => setConfig({ ...config, leadProtectionPeriodDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value={90}>90 Days (Standard Recommended)</option>
                  <option value={60}>60 Days (Fast Cycle / SME)</option>
                  <option value={120}>120 Days (Large Enterprise)</option>
                  <option value={180}>180 Days (Strategic / Government)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Exclusivity Status:</label>
                <select
                  value={config.exclusivity}
                  onChange={(e) => setConfig({ ...config, exclusivity: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Non-Exclusive">Non-Exclusive (Default)</option>
                  <option value="Exclusive (Subject to Schedule)">Exclusive (Requires Executive Schedule)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">NextSoftHR Contracting Entity:</label>
                <input
                  type="text"
                  value={config.contractingEntity}
                  onChange={(e) => setConfig({ ...config, contractingEntity: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 text-xs">
              <label className="block font-semibold text-slate-700 mb-1">Special Conditions & Regulatory Notes:</label>
              <textarea
                rows={2}
                value={config.specialConditions}
                onChange={(e) => setConfig({ ...config, specialConditions: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Generated Schedule C Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-lime-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Schedule C: Territory & Law
                </span>
              </div>
              <button
                onClick={copySchedule}
                className="inline-flex items-center gap-1 text-xs text-lime-400 hover:text-lime-300 cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-mono text-[11px]">Contracting Entity:</span>
                <span className="text-white font-semibold">{config.contractingEntity}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-mono text-[11px]">Governing Law:</span>
                <span className="text-lime-300 font-semibold">{config.governingLaw}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-mono text-[11px]">Dispute Resolution / Venue:</span>
                <span className="text-slate-200">{config.arbitrationVenue}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Exclusivity:</span>
                  <span className="text-white font-medium">{config.exclusivity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Lead Protection:</span>
                  <span className="text-lime-300 font-medium">{config.leadProtectionPeriodDays} Days</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block font-mono text-[11px] mb-1">Local Compliance Mandate:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                  {config.specialConditions}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Incorporated into Master Agreement</span>
              <span>Clauses 10, 74 & 79</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
