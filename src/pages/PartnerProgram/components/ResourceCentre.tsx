import React, { useState } from 'react';
import { RESOURCE_ITEMS } from '../data/partnerData';
import { 
  FileText, 
  Download, 
  Check, 
  FileCheck, 
  Video, 
  Presentation, 
  Sparkles, 
  ArrowRight,
  FolderDown
} from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceCentreProps {
  onDownloadResource: (resource: ResourceItem) => void;
}

export const ResourceCentre: React.FC<ResourceCentreProps> = ({ onDownloadResource }) => {
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownload = (item: ResourceItem) => {
    onDownloadResource(item);
    if (!downloadedIds.includes(item.id)) {
      setDownloadedIds([...downloadedIds, item.id]);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Video': return Video;
      case 'Slide Deck': return Presentation;
      default: return FileText;
    }
  };

  return (
    <section id="resources" className="py-24 bg-slate-50 dark:bg-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-700/60 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <FolderDown className="w-3.5 h-3.5" />
            <span>PARTNER SALES & MARKETING VAULT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Partner Resource Centre
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Access battle-tested collateral, statutory payroll checklists, co-brandable proposal decks, and the comprehensive Partner Playbook.
          </p>
        </div>

        {/* 11 Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-14">
          {RESOURCE_ITEMS.map((res) => {
            const Icon = getFormatIcon(res.format);
            const isDownloaded = downloadedIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="group rounded-2xl bg-white dark:bg-[#071D3E] border border-slate-200/90 dark:border-blue-800/80 p-5 flex flex-col justify-between hover:border-blue-500 dark:hover:border-[#B8F010] transition-all duration-200 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {res.category}
                    </span>
                    <span className="text-[11px] font-semibold text-blue-700 dark:text-[#B8F010]">
                      {res.pagesOrDuration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-700/70 flex items-center justify-center mb-3 group-hover:border-[#B8F010] transition-colors">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-[#B8F010]" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-[#B8F010] transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {res.format}
                  </span>

                  <button
                    onClick={() => handleDownload(res)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                      isDownloaded
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                        : 'bg-blue-50 dark:bg-blue-950 hover:bg-[#B8F010] text-blue-700 dark:text-blue-200 hover:text-[#040E1F] border border-blue-200 dark:border-blue-700'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Ready</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with All Resources Bundle */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-[#0B254A] to-blue-950 dark:from-[#071D3E] dark:via-[#0B254A] dark:to-[#071D3E] border border-blue-700/80 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B8F010]/20 border border-[#B8F010] flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6 text-[#B8F010]" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Download the Complete 2026 NextSofthr Partner Kit (.ZIP)
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 dark:text-slate-300">
                Includes all 11 guides, pitch decks, ROI spreadsheets, and partner agreement template in one package.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload(RESOURCE_ITEMS[10])}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#B8F010] text-[#040E1F] font-extrabold text-xs hover:bg-[#CBFF1A] transition-all shadow-md shadow-[#B8F010]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download All Partner Resources</span>
          </button>
        </div>

      </div>
    </section>
  );
};
