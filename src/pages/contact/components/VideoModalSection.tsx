import React, { useState } from 'react';
import { Play, X, Sparkles, ArrowRight, Laptop, Users, DollarSign } from 'lucide-react';
import videoThumbImage from '../assets/images/video_thumbnail_hr_showcase_1789551923835.jpg';
import { useLanguage } from '../context/LanguageContext';

interface VideoModalSectionProps {
  onScheduleWalkthrough: () => void;
}

export const VideoModalSection: React.FC<VideoModalSectionProps> = ({ onScheduleWalkthrough }) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: t.video.feature2Title,
      duration: '1:45',
      description: t.video.feature2Desc,
      tag: 'Payroll',
    },
    {
      title: t.video.feature1Title,
      duration: '1:10',
      description: t.video.feature1Desc,
      tag: 'Self-Service',
    },
    {
      title: t.video.feature3Title,
      duration: '1:30',
      description: t.video.feature3Desc,
      tag: 'Multi-Currency',
    },
    {
      title: t.whyContact.items.enterprise.title,
      duration: '1:15',
      description: t.whyContact.items.enterprise.description,
      tag: 'Enterprise',
    },
  ];

  return (
    <section className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#1769E0]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#C8F000]/30 text-[#C8F000] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.video.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            {t.video.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t.video.subtitle}
          </p>
        </div>

        {/* Video Thumbnail Frame */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/60 group">
          <img
            src={videoThumbImage}
            alt="NextSofthr HR and payroll software demonstration with African HR leaders"
            className="w-full h-auto aspect-video object-cover brightness-90 group-hover:scale-101 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />

          {/* Dark Overlay with Lemon Accent Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-black/40 to-transparent"></div>

          {/* Play Button Center Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1769E0] text-white hover:scale-110 shadow-2xl shadow-[#1769E0]/60 transition-all duration-300 cursor-pointer border-4 border-[#C8F000] group/btn"
              aria-label="Play NextSofthr product showcase video"
            >
              <div className="absolute inset-0 rounded-full bg-[#C8F000] opacity-20 animate-ping"></div>
              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white translate-x-1 group-hover/btn:text-[#C8F000] group-hover/btn:fill-[#C8F000] transition-colors" />
            </button>

            <span className="mt-4 px-4 py-1.5 rounded-full bg-[#0B1F3A]/90 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-extrabold text-white tracking-wide">
              ▶ {t.video.playVideo} ({t.video.videoDuration})
            </span>
          </div>

          {/* Bottom Chips */}
          <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-center justify-between text-xs text-slate-300 bg-[#0B1F3A]/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Laptop className="w-4 h-4 text-[#C8F000]" />
                {t.video.feature1Title}
              </span>
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <DollarSign className="w-4 h-4 text-[#C8F000]" />
                {t.video.feature2Title}
              </span>
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Users className="w-4 h-4 text-[#C8F000]" />
                {t.video.feature3Title}
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#C8F000]">{t.video.videoDuration}</span>
          </div>
        </div>

      </div>

      {/* Video Interactive Player Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0B1F3A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#08182D]">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#C8F000] animate-pulse"></span>
                <span className="font-bold text-sm text-white">
                  NextSofthr: {chapters[activeChapter].title}
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Stage Simulation */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-[#0B1F3A] to-[#08182D]">
              <div className="aspect-video bg-black/60 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#1769E0]/20 border border-[#C8F000]/40 flex items-center justify-center text-[#C8F000] mb-4">
                  <Play className="w-8 h-8 fill-current" />
                </div>
                
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8F000] mb-1">
                  Chapter {activeChapter + 1} of {chapters.length}
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                  {chapters[activeChapter].title}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {chapters[activeChapter].description}
                </p>

                {/* Simulated Progress bar */}
                <div className="w-full max-w-md bg-white/10 h-1.5 rounded-full overflow-hidden mt-6">
                  <div className="bg-[#C8F000] h-full w-2/3"></div>
                </div>
              </div>

              {/* Chapters Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      activeChapter === idx
                        ? 'bg-[#1769E0] border-[#C8F000] text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-[#C8F000] flex justify-between">
                      <span>{ch.tag}</span>
                      <span>{ch.duration}</span>
                    </div>
                    <div className="text-xs font-semibold truncate mt-0.5">{ch.title}</div>
                  </button>
                ))}
              </div>

              {/* Modal CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  {t.form.subtitle}
                </span>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    onScheduleWalkthrough();
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#0B1F3A] bg-[#C8F000] hover:bg-[#bde300] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{t.video.scheduleWalkthrough}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

