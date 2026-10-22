import React from 'react';
import { 
  Layers, 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Plus,
  Trash2 
} from 'lucide-react';
import { Partner } from '../types';

interface PartnerComparisonDockProps {
  comparedPartners: Partner[];
  onOpenComparison: () => void;
  onRemovePartner: (partnerId: string) => void;
  onClearAll: () => void;
}

export const PartnerComparisonDock: React.FC<PartnerComparisonDockProps> = ({
  comparedPartners,
  onOpenComparison,
  onRemovePartner,
  onClearAll
}) => {
  if (comparedPartners.length === 0) return null;

  const canCompare = comparedPartners.length >= 2;

  return (
    <aside 
      aria-label="Partner comparison drawer"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-bounce-subtle"
    >
      <div className="bg-[#071938]/95 dark:bg-[#061124]/95 backdrop-blur-xl border border-blue-500/40 dark:border-[#c8f526]/40 rounded-2xl p-3 sm:p-3.5 shadow-2xl shadow-blue-950/80 text-white flex flex-col sm:flex-row items-center justify-between gap-3 transition-all">
        
        {/* Left: Selected Partners Avatars & Status */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Badge Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#c8f526] text-[#071938] flex items-center justify-center shrink-0 shadow-md">
            <Layers className="w-5 h-5 font-black" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-tight text-white">
                Compare Partners
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-900/80 text-[#c8f526] border border-blue-700/60">
                {comparedPartners.length} of 4
              </span>
            </div>
            
            <p className="text-[11px] text-slate-300">
              {canCompare
                ? 'Ready for side-by-side service evaluation'
                : 'Select 1 more partner to compare'}
            </p>
          </div>

          {/* Avatars Carousel */}
          <div className="flex items-center -space-x-2 ml-1">
            {comparedPartners.map((partner) => (
              <div 
                key={partner.id}
                className="relative group w-8 h-8 rounded-full border-2 border-[#071938] bg-gradient-to-br from-[#0c2b64] to-[#184ea8] text-[#c8f526] font-black text-xs flex items-center justify-center overflow-hidden shadow-xs shrink-0 select-none"
                title={partner.companyName}
              >
                <span>{partner.companyName.trim().slice(0, 2).toUpperCase()}</span>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePartner(partner.id);
                  }}
                  className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  aria-label={`Remove ${partner.companyName}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders up to 4 */}
            {Array.from({ length: 4 - comparedPartners.length }).map((_, idx) => (
              <div 
                key={`empty-${idx}`}
                className="w-8 h-8 rounded-full border border-dashed border-slate-500/60 bg-blue-950/40 flex items-center justify-center text-slate-400 text-[10px]"
                title="Add up to 4 partners"
              >
                <Plus className="w-3 h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={onClearAll}
            className="px-2.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onOpenComparison}
            disabled={!canCompare}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ${
              canCompare
                ? 'bg-[#c8f526] hover:bg-[#b5e01b] text-[#071938] hover:scale-105 active:scale-95 cursor-pointer'
                : 'bg-blue-900/60 text-slate-400 cursor-not-allowed border border-blue-800/40'
            }`}
          >
            <span>Compare Now ({comparedPartners.length})</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </aside>
  );
};
