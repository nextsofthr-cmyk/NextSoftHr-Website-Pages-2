import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface StickyMobileCTAProps {
  onOpenLeadModal: (service?: string) => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onOpenLeadModal }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl lg:hidden">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          onClick={() => onOpenLeadModal('Mobile Quick Inquiry')}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-lime-400 to-[#9AE616] text-slate-950 font-bold rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <PhoneCall className="w-4 h-4 text-slate-950" />
          <span>Talk to an Outsourcing Expert</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
