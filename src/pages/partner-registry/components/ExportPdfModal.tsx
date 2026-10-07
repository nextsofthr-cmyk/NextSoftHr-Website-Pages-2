import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  Printer, 
  CheckCircle2, 
  Layers, 
  Sliders, 
  Sparkles, 
  Download, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Partner, FilterState } from '../types';
import { downloadPartnerDirectoryPdf, PdfExportOptions } from '../utils/pdfExport';
import { PartnerCategoryBadge } from './PartnerCategoryBadge';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: Partner[];
  filters: FilterState;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  partners,
  filters
}) => {
  if (!isOpen) return null;

  const [includeContact, setIncludeContact] = useState(true);
  const [includeServices, setIncludeServices] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setDownloadSuccess(false);

    try {
      const options: PdfExportOptions = {
        includeContact,
        includeServices,
        includeMetrics
      };
      downloadPartnerDirectoryPdf(partners, filters, options);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4500);
    } catch (err) {
      console.error('Failed to export PDF', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Compile active filter labels
  const activeFiltersSummary: string[] = [];
  if (filters.country) activeFiltersSummary.push(`Country: ${filters.country}`);
  if (filters.city) activeFiltersSummary.push(`City: ${filters.city}`);
  if (filters.partnerType) activeFiltersSummary.push(`Type: ${filters.partnerType}`);
  if (filters.partnerLevel) activeFiltersSummary.push(`Level: ${filters.partnerLevel}`);
  if (filters.service) activeFiltersSummary.push(`Service: ${filters.service}`);
  if (filters.industry) activeFiltersSummary.push(`Industry: ${filters.industry}`);
  if (filters.businessSize) activeFiltersSummary.push(`Size: ${filters.businessSize}`);
  if (filters.verifiedOnly) activeFiltersSummary.push('Verified Only');
  if (filters.searchQuery) activeFiltersSummary.push(`Search: "${filters.searchQuery}"`);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#071938] text-white p-6 border-b border-blue-900 flex items-start justify-between shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-[#c8f526]/40 text-[#c8f526] text-xs font-bold uppercase tracking-wider">
              <FileDown className="w-3.5 h-3.5" />
              <span>EXPORT PARTNER DIRECTORY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Export Branded Partner Summary (PDF)
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Download a clean, verified executive summary of the currently filtered partner list formatted with official NextSofthr branding, contact coordinates, and statutory service credentials.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Options and Live Document Preview */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Success Banner if exported */}
          {downloadSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <strong>PDF Downloaded Successfully!</strong> The branded directory brief containing {partners.length} partner{partners.length === 1 ? '' : 's'} has been saved to your device.
              </div>
            </div>
          )}

          {/* Export Settings Row */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#0c2b64] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-700" />
                <span>PDF Summary Options</span>
              </div>
              <p className="text-xs text-slate-500">
                Choose which fields to include in the generated document table:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeContact}
                  onChange={(e) => setIncludeContact(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">Contact Details</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeServices}
                  onChange={(e) => setIncludeServices(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">Core Services</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeMetrics}
                  onChange={(e) => setIncludeMetrics(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">Track Record</span>
              </label>
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="border border-slate-300 rounded-xl shadow-inner bg-white overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-blue-800" />
                <span>Document Layout Preview ({partners.length} Partners Included)</span>
              </span>
              <span className="text-slate-400 font-normal">A4 Format • Portrait</span>
            </div>

            {/* Simulated PDF Page */}
            <div className="p-6 bg-white text-slate-900 font-sans space-y-4">
              
              {/* PDF Header Mock */}
              <div className="bg-[#071938] text-white p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0c2b64] border border-[#c8f526] flex items-center justify-center text-sm font-black">
                    <span className="text-white">N</span>
                    <span className="text-[#c8f526]">S</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-black tracking-tight text-white leading-tight">
                      Next<span className="text-[#c8f526]">Softhr</span> Global Partner Registry
                    </h4>
                    <p className="text-[10px] text-slate-300">
                      Official Verified Partner Directory Summary • Pan-African & Global Ecosystem
                    </p>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-300 leading-tight">
                  <div className="text-[#c8f526] font-bold">www.nextsofthr.org</div>
                  <div>Tel: +234 915 848 2622</div>
                  <div>partners@nextsofthr.org</div>
                </div>
              </div>

              {/* Filter Criteria Summary Box */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-[#0c2b64]">Applied Filter Criteria: </span>
                  <span className="text-slate-600">
                    {activeFiltersSummary.length > 0 
                      ? activeFiltersSummary.join(' • ') 
                      : 'All Countries & Services (Global Roster)'}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[11px] font-bold">
                    {partners.length} Verified Partner{partners.length === 1 ? '' : 's'}
                  </span>
                </div>
              </div>

              {/* Table Preview */}
              <div className="border border-slate-200 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0c2b64] text-white">
                      <th className="p-2.5 font-bold">Partner Name & Tier</th>
                      <th className="p-2.5 font-bold">Location</th>
                      <th className="p-2.5 font-bold">Partner Type</th>
                      {includeServices && <th className="p-2.5 font-bold">Key Services</th>}
                      {includeMetrics && <th className="p-2.5 font-bold">Experience</th>}
                      {includeContact && <th className="p-2.5 font-bold">Contact Coordinates</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {partners.slice(0, 5).map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/80">
                        <td className="p-2.5 align-top">
                          <div className="font-bold text-[#0c2b64]">{p.companyName}</div>
                          <div className="text-[10px] text-blue-700 font-semibold">{p.partnerLevel}</div>
                          {p.isVerified && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] text-emerald-700 font-bold">
                              ✓ Verified
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 align-top text-slate-600">
                          <div>{p.city}</div>
                          <div className="text-[10px] text-slate-400">{p.country}</div>
                        </td>
                        <td className="p-2.5 align-top">
                          <PartnerCategoryBadge category={p.partnerType} size="xs" />
                        </td>
                        {includeServices && (
                          <td className="p-2.5 align-top text-slate-600 max-w-[150px]">
                            {p.services.slice(0, 2).join(', ')}
                            {p.services.length > 2 && <span className="text-slate-400"> +{p.services.length - 2} more</span>}
                          </td>
                        )}
                        {includeMetrics && (
                          <td className="p-2.5 align-top text-slate-600 whitespace-nowrap">
                            <div>{p.numberOfImplementations} Impls</div>
                            <div className="text-[10px] text-slate-400">{p.yearsExperience} yrs • ★ {p.rating.toFixed(1)}</div>
                          </td>
                        )}
                        {includeContact && (
                          <td className="p-2.5 align-top text-slate-600 text-[11px]">
                            <div className="truncate max-w-[140px] text-blue-800">{p.email}</div>
                            <div className="text-[10px] text-slate-500">{p.phone}</div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {partners.length > 5 && (
                <div className="text-center py-2 text-xs text-slate-500 italic bg-slate-50 rounded border border-dashed border-slate-200">
                  + {partners.length - 5} additional partner records will be included in the complete multi-page PDF output.
                </div>
              )}

              {/* PDF Footer Note Mock */}
              <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                <span>NextSofthr Official Partner Registry • Confidential & Verified Client Summary</span>
                <span>Page 1 of {Math.max(1, Math.ceil(partners.length / 8))}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Ready to export <strong>{partners.length} partner{partners.length === 1 ? '' : 's'}</strong> based on current filters.
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 flex-1 sm:flex-none"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Brief</span>
            </button>

            <button
              onClick={handleExport}
              disabled={isExporting}
              type="button"
              className="px-5 py-2.5 rounded-xl bg-[#0c2b64] hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <Download className="w-4 h-4 text-[#c8f526]" />
              <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
