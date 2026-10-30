import React from 'react';
import { Globe2, Sparkles, Check, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PPP_REGIONS, PPPRegion } from '../data/pppPricing';
import { CurrencyCode } from '../types';

interface CountryPricingToggleProps {
  isPPPEnabled: boolean;
  onTogglePPP: (enabled: boolean) => void;
  selectedRegionId: string;
  onSelectRegion: (region: PPPRegion) => void;
}

export const CountryPricingToggle: React.FC<CountryPricingToggleProps> = ({
  isPPPEnabled,
  onTogglePPP,
  selectedRegionId,
  onSelectRegion,
}) => {
  const currentRegion = PPP_REGIONS.find((r) => r.id === selectedRegionId) || PPP_REGIONS[0];

  return (
    <div
      id="country-pricing-toggle-container"
      className="max-w-4xl mx-auto mb-8 px-4 sm:px-0"
    >
      <div className="rounded-2xl bg-gradient-to-r from-blue-50 via-white to-lime-50 dark:from-[#0f172a] dark:via-[#111C38] dark:to-[#0f231c] border-2 border-blue-200/80 dark:border-blue-900/60 p-4 sm:p-5 shadow-sm transition-all duration-200">
        {/* Header row: Toggle Switch + Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0265DC] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Country-Specific Pricing Table</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#A3E635] text-slate-950 font-black tracking-wide uppercase">
                    PPP Adjusted
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Localized purchasing power adjustments for India, Brazil, Southeast Asia &amp; Africa.
              </p>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {isPPPEnabled ? (
                <span className="text-emerald-600 dark:text-lime-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>PPP Pricing Active</span>
                </span>
              ) : (
                <span>Global Standard</span>
              )}
            </span>
            <button
              type="button"
              id="ppp-master-toggle-btn"
              role="switch"
              aria-checked={isPPPEnabled}
              onClick={() => onTogglePPP(!isPPPEnabled)}
              className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0265DC] focus:ring-offset-2 ${
                isPPPEnabled ? 'bg-[#0265DC]' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isPPPEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Region Selector Pills */}
        <div className="mt-4">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#0265DC] dark:text-blue-400" />
            <span>Select Local Purchasing Power Region:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {PPP_REGIONS.map((region) => {
              const isSelected = isPPPEnabled && selectedRegionId === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  id={`ppp-region-btn-${region.id}`}
                  onClick={() => {
                    if (!isPPPEnabled) {
                      onTogglePPP(true);
                    }
                    onSelectRegion(region);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white dark:bg-[#0B132B] border-[#0265DC] ring-2 ring-[#0265DC]/30 shadow-md'
                      : 'bg-white/80 dark:bg-[#070D1E]/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-lg leading-none">{region.flag}</span>
                    {region.discountPercent > 0 ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md font-extrabold bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-[#A3E635]">
                        -{region.discountPercent}%
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-md font-medium text-slate-400">
                        Base
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {region.shortLabel}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Currency: {region.currency}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Banner when PPP is active */}
        {isPPPEnabled && (
          <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Sparkles className="w-4 h-4 text-[#A3E635] shrink-0" />
              <span>
                <strong>{currentRegion.name}:</strong> {currentRegion.description}
              </span>
            </div>
            {currentRegion.discountPercent > 0 && (
              <div className="shrink-0 px-2.5 py-1 rounded-lg bg-[#A3E635]/20 dark:bg-[#A3E635]/10 text-emerald-800 dark:text-[#A3E635] font-extrabold text-[11px] border border-[#A3E635]/30 flex items-center gap-1">
                <span>Saving {currentRegion.discountPercent}% with localized PPP index</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
