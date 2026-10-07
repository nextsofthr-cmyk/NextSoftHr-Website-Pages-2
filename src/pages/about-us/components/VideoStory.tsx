import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Clock,
  Film,
  CheckCircle2,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { VIDEO_STORY_CHAPTERS } from '../data/contentData';

export const VideoStory: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const totalDuration = 90; // 90 seconds concept
  const activeChapter = VIDEO_STORY_CHAPTERS[currentChapterIndex];

  // Simulated playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          const nextSec = prev + 1;
          // Calculate which chapter corresponds
          const chapterIdx = Math.min(
            Math.floor((nextSec / totalDuration) * VIDEO_STORY_CHAPTERS.length),
            VIDEO_STORY_CHAPTERS.length - 1
          );
          setCurrentChapterIndex(chapterIdx);
          return nextSec;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const jumpToChapter = (idx: number) => {
    setCurrentChapterIndex(idx);
    const approxSeconds = Math.floor((idx / VIDEO_STORY_CHAPTERS.length) * totalDuration);
    setElapsedSeconds(approxSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="video-story" className="py-20 lg:py-28 bg-[#0A2540] dark:bg-[#06101E] text-white relative overflow-hidden border-b border-slate-800 transition-colors duration-300">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-[#0B3B73]/40 via-[#84CC16]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-xs font-bold text-[#84CC16]">
            <Film className="w-3.5 h-3.5" />
            <span>Corporate Brand Showcase • 90 Seconds</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet NextSofthr
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Experience the real journey of modern African enterprises and global workplaces
            operating with seamless people management, automated payroll, and intelligent workflows.
          </p>
        </div>

        {/* Video Player Interface */}
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          {/* Main Cinematic Video Screen View */}
          <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center group">
            <img
              src={activeChapter.thumbnail}
              alt={activeChapter.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

            {/* Top Scene Chapter Label */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="bg-[#0A2540]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-ping"></span>
                <span>Scene {activeChapter.id} of 10</span>
                <span className="text-[#84CC16]">•</span>
                <span className="text-slate-300">{activeChapter.time}</span>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-slate-300">
                4K Cinematic Master • NextSofthr Brand Story
              </div>
            </div>

            {/* Center Big Play Button (when paused) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute w-20 h-20 rounded-full bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] flex items-center justify-center shadow-2xl shadow-[#84CC16]/40 hover:scale-110 transition-transform cursor-pointer"
                aria-label="Play Video"
              >
                <Play className="w-8 h-8 ml-1 fill-current" />
              </button>
            )}

            {/* Subtitle / Scene Narrative Overlay */}
            <div className="absolute bottom-16 left-6 right-6 max-w-2xl bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/15">
              <div className="text-[#84CC16] font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {activeChapter.title}
              </div>
              <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                {activeChapter.description}
              </p>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 to-transparent px-4 py-3 flex flex-col gap-2">
              {/* Timeline Progress Bar */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickRatio = (e.clientX - rect.left) / rect.width;
                  const newTime = Math.floor(clickRatio * totalDuration);
                  setElapsedSeconds(newTime);
                  const newIdx = Math.min(
                    Math.floor(clickRatio * VIDEO_STORY_CHAPTERS.length),
                    VIDEO_STORY_CHAPTERS.length - 1
                  );
                  setCurrentChapterIndex(newIdx);
                }}
                className="w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer relative overflow-hidden transition-all"
              >
                <div
                  className="h-full bg-[#84CC16]"
                  style={{ width: `${(elapsedSeconds / totalDuration) * 100}%` }}
                ></div>
              </div>

              {/* Action Buttons & Timers */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => {
                      setElapsedSeconds(0);
                      setCurrentChapterIndex(0);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <span className="font-mono text-xs">
                    {formatTime(elapsedSeconds)} / {formatTime(totalDuration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#84CC16] font-semibold hidden sm:inline">
                    Interactive Chapter Timeline Below
                  </span>
                  <button
                    onClick={() => {
                      const el = document.getElementById('video-story');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 10 Chapters Interactive Selector Scroller */}
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#84CC16]" />
                Brand Narrative Chapters (Click to Jump)
              </span>
              <span className="text-[11px] text-slate-400">
                10 Story Milestones
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {VIDEO_STORY_CHAPTERS.map((chapter, idx) => {
                const isActive = currentChapterIndex === idx;
                return (
                  <button
                    key={chapter.id}
                    onClick={() => jumpToChapter(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-[#0B3B73] border-[#84CC16] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={isActive ? 'text-[#84CC16] font-bold' : ''}>
                        {chapter.time}
                      </span>
                      {isActive && <CheckCircle2 className="w-3 h-3 text-[#84CC16]" />}
                    </div>
                    <div className="text-[11px] font-bold truncate text-white">
                      {chapter.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
