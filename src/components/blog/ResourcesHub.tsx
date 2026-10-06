import React, { useState } from 'react';
import { RESOURCES_LIST } from '../data/resourcesHub';
import { ResourceItem } from '../types/blog';
import { Download, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ResourcesHub: React.FC = () => {
  const { t } = useLanguage();
  const [activeResource, setActiveResource] = useState<ResourceItem | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setActiveResource(null);
      setEmailInput('');
    }, 2500);
  };

  return (
    <section id="resources" className="py-16 bg-slate-50 dark:bg-[#07192F] border-b border-slate-200 dark:border-[#1E3656] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000]">
              <span className="w-2 h-2 rounded-full bg-[#8EE000]" />
              <span>{t('resources.kicker', 'NextSoftHr Knowledge Assets')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-heading">
              {t('resources.title', 'More Resources for Your Business')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {t('resources.subtitle', 'Download practical frameworks, regulatory tax checklists, legal contract templates, and empirical benchmark reports vetted by corporate people leaders.')}
            </p>
          </div>
        </div>


        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES_LIST.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveResource(item)}
              className="bg-white dark:bg-[#0B1E36] hover:bg-[#F8FAFC] dark:hover:bg-[#0E2442] rounded-2xl p-6 border border-slate-200 dark:border-[#1E3656] hover:border-[#0A3F7E]/40 dark:hover:border-[#8EE000]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 px-2.5 py-1 rounded-md">
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-400">
                    {item.pagesOrDuration}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#0A3F7E] dark:group-hover:text-[#60A5FA] transition-colors leading-snug font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-[#1E3656] flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-400 font-mono text-[11px]">{item.downloadCount}</span>
                <span className="font-bold text-[#0A3F7E] dark:text-[#8EE000] group-hover:text-slate-950 dark:group-hover:text-white flex items-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5 text-[#8EE000]" />
                  <span>Access Asset</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Modal / Download Lead Capture */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0B1E36] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#1E3656] relative">
            <button
              onClick={() => setActiveResource(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#122A4A]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#0A3F7E] dark:text-[#8EE000] bg-[#0A3F7E]/10 dark:bg-[#8EE000]/15 px-2.5 py-1 rounded-md">
                {activeResource.type} · {activeResource.format}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                {activeResource.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeResource.description}
              </p>

              <div className="p-3 bg-slate-50 dark:bg-[#07192F] rounded-xl border border-slate-200 dark:border-[#1E3656] text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div className="font-bold">What is included:</div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8EE000]" />
                  <span>Instant digital delivery to your corporate email</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8EE000]" />
                  <span>Audited for 2026 legal & statutory accuracy</span>
                </div>
              </div>

              {downloadSuccess ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs text-center font-bold">
                  ✓ Success! Download link generated and dispatched to {emailInput}.
                </div>
              ) : (
                <form onSubmit={handleDownload} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-[#1E3656] bg-white dark:bg-[#07192F] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A3F7E] dark:focus:ring-[#8EE000]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-bold text-slate-950 bg-[#8EE000] hover:bg-[#9EF01A] transition-all flex items-center justify-center gap-2 shadow-xs border border-[#7BC500]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {activeResource.format}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
