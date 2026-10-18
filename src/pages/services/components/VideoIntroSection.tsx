import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  Subtitles,
  MessageCircle,
  ShieldCheck,
  Building2,
  Globe2,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface VideoIntroSectionProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

interface Chapter {
  id: number;
  title: string;
  time: string;
  seconds: number;
  description: string;
  highlight: string;
  narratorScript: string;
  bgImage: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'The Pan-African HR Reality',
    time: '0:00',
    seconds: 0,
    description: 'Addressing manual spreadsheets, delayed salary approvals, and multi-branch attendance leaks.',
    highlight: 'Scattered records & compliance stress eliminated',
    narratorScript:
      'Welcome to NextSofthr. Across Africa, growing organizations face a unique dilemma: managing distributed teams across cities, remote sites, and borders with disconnected spreadsheets, chaotic WhatsApp approvals, and complex statutory tax rules. NextSofthr was purpose-built to unify your entire workforce into one robust, audit-proof operating system.',
    bgImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop', // Professional African female executive
  },
  {
    id: 2,
    title: 'Automated Multi-Country Payroll',
    time: '0:42',
    seconds: 42,
    description: '1-click calculation for PAYE, NHF, pension remittances, and statutory deduction filings.',
    highlight: '3-click payroll with 100% tax accuracy',
    narratorScript:
      'Our intelligent payroll engine calculates PAYE, pensions, NHF, and local statutory levies in seconds. Whether your teams are in Lagos, Accra, Nairobi, or Johannesburg, your monthly salaries, tax filings, and digitized payslips run error-free with automatic direct bank disbursements.',
    bgImage:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop', // Confident African business presenter
  },
  {
    id: 3,
    title: 'Biometrics & Remote Field Sync',
    time: '1:25',
    seconds: 85,
    description: 'Hardware turnstile integration, facial verification, and offline-capable mobile geofencing.',
    highlight: 'Zero ghost workers & real-time shift rosters',
    narratorScript:
      'Managing construction sites, hospitals, or retail branches? NextSofthr connects directly with biometric turnstiles and mobile GPS geofencing. Employees clock in seamlessly even when offline, eradicating buddy punching and ghost workers permanently.',
    bgImage:
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200&auto=format&fit=crop', // Focused African professional with tablet
  },
  {
    id: 4,
    title: 'Employee Self-Service & Approvals',
    time: '2:05',
    seconds: 125,
    description: 'Mobile leaves, loan requests, expense claims, and automated multi-tier managerial workflows.',
    highlight: '78% reduction in routine HR inquiries',
    narratorScript:
      'Empower your staff with our intuitive self-service portal. Employees request annual leave, submit medical expenses, and view tax certificates right from their mobile phones, freeing your HR leaders to focus on strategic organizational growth.',
    bgImage:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop', // Collaborative modern African team
  },
  {
    id: 5,
    title: 'AI Insights & Audit Readiness',
    time: '2:40',
    seconds: 160,
    description: 'Real-time executive dashboards, attrition analytics, and NDPR/GDPR compliance vaults.',
    highlight: 'Predictive retention & instant board reports',
    narratorScript:
      'Finally, executive leaders gain instant board-ready visibility. Track operational costs, workforce retention, and compliance health in real time. Welcome to the future of African enterprise human resources with NextSofthr.',
    bgImage:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop', // Executive briefing room
  },
];

const TOTAL_DURATION = 195; // 3 mins 15 seconds

export const VideoIntroSection: React.FC<VideoIntroSectionProps> = ({
  onOpenDemo,
  onOpenGetStarted,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [hasVoiceoverEnabled, setHasVoiceoverEnabled] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync active chapter with current time
  useEffect(() => {
    let currentIdx = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTime >= CHAPTERS[i].seconds) {
        currentIdx = i;
        break;
      }
    }
    setActiveChapterIndex(currentIdx);
  }, [currentTime]);

  // Simulated video playback ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              setIsSpeaking(false);
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed]);

  // Voice narration using Web Speech API
  const speakNarrator = (text: string) => {
    if (!('speechSynthesis' in window) || isMuted || !hasVoiceoverEnabled) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      
      // Select an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Google'))
      ) || voices.find((v) => v.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Graceful fallback if speech synthesis is disabled or blocked
      setIsSpeaking(false);
    }
  };

  // Play / Pause handling
  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if (hasVoiceoverEnabled && !isMuted) {
        speakNarrator(CHAPTERS[activeChapterIndex].narratorScript);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  // Chapter Jump
  const handleJumpToChapter = (index: number) => {
    const chapter = CHAPTERS[index];
    setCurrentTime(chapter.seconds);
    setActiveChapterIndex(index);
    if (isPlaying && hasVoiceoverEnabled && !isMuted) {
      speakNarrator(chapter.narratorScript);
    }
  };

  // Scrub bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = Math.round(percentage * TOTAL_DURATION);
    setCurrentTime(newTime);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (!nextMuted && isPlaying && hasVoiceoverEnabled) {
      speakNarrator(CHAPTERS[activeChapterIndex].narratorScript);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const currentChapter = CHAPTERS[activeChapterIndex];
  const progressPercent = (currentTime / TOTAL_DURATION) * 100;

  return (
    <section
      id="video-tour"
      className="py-20 bg-slate-900 text-white relative overflow-hidden transition-colors"
    >
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540] via-slate-900 to-[#07182E] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#0256C4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-[#84CC16] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Video Masterclass • 3-Minute Walkthrough</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See How NextSofthr Transforms{' '}
            <span className="text-[#84CC16]">African Enterprise HR</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experience our comprehensive platform through this guided walkthrough narrated by senior African workforce strategists, detailing the exact transition from manual payroll friction to automated excellence.
          </p>
        </div>

        {/* Video Player & Chapter Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* MAIN VIDEO PLAYER (7 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black group aspect-video sm:aspect-[16/9] flex items-center justify-center">
              {/* Dynamic Video Visual Frame */}
              <img
                src={currentChapter.bgImage}
                alt={currentChapter.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center filter brightness-85 group-hover:scale-102 transition-transform duration-700"
              />

              {/* Video Overlay Tint & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

              {/* Top Presenter Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-wide uppercase text-white">
                    HD Executive Tour
                  </span>
                  <span className="text-[11px] text-[#84CC16] hidden sm:inline">
                    • Dr. Amina Bello, Workforce Strategist
                  </span>
                </div>

                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[11px] font-mono text-white/90">
                  {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                </div>
              </div>

              {/* Big Center Play / Pause Indicator */}
              <button
                type="button"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause masterclass' : 'Play masterclass'}
                className={`relative z-20 w-18 h-18 sm:w-22 sm:h-22 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-2xl ${
                  isPlaying
                    ? 'bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:scale-105'
                    : 'bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] scale-100 hover:scale-110'
                }`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-9 h-9 fill-current ml-1" />
                )}
              </button>

              {/* Synchronized Closed Captions / Narrator Teleprompter */}
              {showCaptions && (
                <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 z-20 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 max-w-2xl mx-auto text-center shadow-lg">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16] mb-0.5">
                      Narrator Audio Transcript
                    </div>
                    <p className="text-xs sm:text-sm text-white/95 font-medium leading-snug line-clamp-3">
                      &ldquo;{currentChapter.narratorScript}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Player Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-4 z-20">
                {/* Scrub Timeline Track */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-2 bg-white/25 hover:h-2.5 rounded-full cursor-pointer mb-3 transition-all group/scrub"
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-[#84CC16] rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
                  </div>

                  {/* Chapter Tick Marks */}
                  {CHAPTERS.map((ch) => (
                    <div
                      key={ch.id}
                      className="absolute top-0 bottom-0 w-0.5 bg-black/60 pointer-events-none"
                      style={{ left: `${(ch.seconds / TOTAL_DURATION) * 100}%` }}
                      title={ch.title}
                    />
                  ))}
                </div>

                {/* Control Actions Row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="text-white hover:text-[#84CC16] transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>

                    {/* Rewind to Start */}
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentTime(0);
                        setActiveChapterIndex(0);
                        if (isPlaying && hasVoiceoverEnabled && !isMuted) {
                          speakNarrator(CHAPTERS[0].narratorScript);
                        }
                      }}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Mute/Volume */}
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className="text-white/80 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-red-400" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    {/* Time Counter */}
                    <span className="font-mono text-[11px] text-white/80">
                      {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                    </span>
                  </div>

                  {/* Right side controls */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Voiceover Speech Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !hasVoiceoverEnabled;
                        setHasVoiceoverEnabled(next);
                        if (!next && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                        } else if (next && isPlaying && !isMuted) {
                          speakNarrator(currentChapter.narratorScript);
                        }
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                        hasVoiceoverEnabled
                          ? 'bg-[#84CC16]/20 text-[#84CC16] border-[#84CC16]/50'
                          : 'bg-white/10 text-white/60 border-white/15 hover:text-white'
                      }`}
                      title="Toggle spoken narrator audio voice"
                    >
                      Voice: {hasVoiceoverEnabled ? 'ON' : 'OFF'}
                    </button>

                    {/* Subtitles / CC Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`p-1 rounded hover:bg-white/10 transition-colors cursor-pointer ${
                        showCaptions ? 'text-[#84CC16]' : 'text-white/50'
                      }`}
                      title="Toggle Subtitles"
                    >
                      <Subtitles className="w-4 h-4" />
                    </button>

                    {/* Speed Selector */}
                    <select
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                      className="bg-white/10 border border-white/20 rounded px-1.5 py-0.5 text-[11px] font-bold text-white focus:outline-none cursor-pointer"
                    >
                      <option value="1" className="bg-[#0A2540] text-white">1.0x</option>
                      <option value="1.25" className="bg-[#0A2540] text-white">1.25x</option>
                      <option value="1.5" className="bg-[#0A2540] text-white">1.5x</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Chapter Callout Bar */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#84CC16]/20 text-[#84CC16] flex items-center justify-center font-bold text-sm shrink-0">
                  {currentChapter.id}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#84CC16] flex items-center gap-1.5">
                    <span>Now Playing:</span>
                    <span className="text-white font-extrabold">{currentChapter.title}</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                    {currentChapter.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <span className="text-[11px] bg-white/10 text-blue-200 px-2.5 py-1 rounded-full font-medium">
                  {currentChapter.highlight}
                </span>
              </div>
            </div>
          </div>

          {/* CHAPTER NAVIGATION & EXECUTIVE TAKEAWAYS (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            {/* Interactive Chapter List */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-5 border border-white/15 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <div className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#84CC16]" />
                  <span>Masterclass Chapters</span>
                </div>
                <span className="text-[11px] text-blue-200 font-mono">
                  {CHAPTERS.length} Key Segments
                </span>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto max-h-[340px] pr-1">
                {CHAPTERS.map((chapter, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => handleJumpToChapter(idx)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 border cursor-pointer ${
                        isActive
                          ? 'bg-[#0256C4]/40 border-[#84CC16] shadow-md'
                          : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          isActive
                            ? 'bg-[#84CC16] text-[#0A2540]'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {chapter.time}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-bold leading-snug truncate ${
                            isActive ? 'text-[#84CC16]' : 'text-white'
                          }`}
                        >
                          {chapter.title}
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {chapter.description}
                        </p>
                      </div>

                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#84CC16] animate-ping self-center shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Narrator Profile Box */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#84CC16]/60 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                    alt="Dr. Amina Bello"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs min-w-0">
                  <div className="font-bold text-white truncate">Dr. Amina Bello</div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Chief Workforce Strategist &amp; Former HR Director
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-950/60 to-[#0A2540] border border-blue-800/60 space-y-3">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
                Ready to transform your HR?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-black text-xs transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Book Guided Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onOpenGetStarted}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center cursor-pointer"
                >
                  Start Free Trial
                </button>
              </div>

              <a
                href="https://wa.me/2349158482622?text=Hello%20NextSofthr%20Team%2C%20I%20just%20watched%20your%20video%20introduction%20and%20would%20like%20to%20schedule%20a%20personalized%20walkthrough."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 font-semibold text-[11px] border border-emerald-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Discuss with Video Host on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
