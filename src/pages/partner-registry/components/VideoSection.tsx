import React, { useState } from 'react';
import { Play, X, Clock, Video, CheckCircle2, Sparkles } from 'lucide-react';
import { VIDEOS_DATA, VideoItem } from '../data/content';

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#061124] border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-[#0c2b64] dark:text-[#c8f526] text-xs font-bold uppercase tracking-wider mb-3">
            <Video className="w-3.5 h-3.5 text-blue-700 dark:text-[#c8f526]" />
            <span>ECOSYSTEM SPOTLIGHT & TUTORIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0c2b64] dark:text-white tracking-tight">
            See How NextSofthr Partners Help Businesses Grow
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-400">
            Watch real implementation walkthroughs, interviews with certified African HR practitioners, and partner success blueprints.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideo(item)}
              className="bg-[#f8fafc] dark:bg-[#0a1c3b] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Container with Play Icon */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#c8f526] text-[#071938] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[11px] font-semibold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase text-blue-700 dark:text-[#c8f526] tracking-wider">
                    {item.speakerRole}
                  </span>
                  <h3 className="text-sm font-bold text-[#0c2b64] dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-[#c8f526] line-clamp-2 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1 text-[11px] font-bold text-blue-900 dark:text-[#c8f526] group-hover:text-blue-600 dark:group-hover:text-lime-300 flex items-center justify-between">
                <span>Watch Video ({item.duration})</span>
                <span>▶</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0a1c3b] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative animate-fadeIn">
            
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Mockup Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-[#c8f526] text-[#071938] flex items-center justify-center mb-4 shadow-xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold max-w-md">{activeVideo.title}</h4>
                <p className="text-xs text-slate-300 mt-2 max-w-sm">
                  {activeVideo.speaker} • {activeVideo.speakerRole}
                </p>
              </div>
            </div>

            {/* Modal Info */}
            <div className="p-6 bg-white dark:bg-[#0a1c3b]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#0c2b64] dark:text-white">{activeVideo.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{activeVideo.summary}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-[#c8f526] shrink-0 border border-transparent dark:border-blue-800">
                  {activeVideo.duration}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#c8f526]" />
                  <span>NextSofthr Partner Ecosystem Media Series</span>
                </span>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-[#061227] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
