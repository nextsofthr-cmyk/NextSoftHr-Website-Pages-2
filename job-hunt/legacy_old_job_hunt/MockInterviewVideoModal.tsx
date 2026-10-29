import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Video, 
  FileText, 
  Target, 
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Job, ParsedResumeProfile } from '../types';

interface MockInterviewVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  candidateProfile?: ParsedResumeProfile | null;
  onToast?: (message: string) => void;
}

interface VideoScene {
  id: number;
  timeStart: number; // in seconds
  timeEnd: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  caption: string;
  badge: string;
}

export const MockInterviewVideoModal: React.FC<MockInterviewVideoModalProps> = ({
  isOpen,
  onClose,
  job,
  candidateProfile,
  onToast
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 60 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'video' | 'script'>('video');
  const timerRef = useRef<any>(null);

  const candidateName = candidateProfile?.fullName || 'Candidate';
  const candidateSkills = (candidateProfile?.extractedSkills || []).slice(0, 4);

  // Generate 5 structured scenes totalling exactly 60 seconds
  const scenes: VideoScene[] = [
    {
      id: 1,
      timeStart: 0,
      timeEnd: 12,
      badge: '01 · Strategic Mission',
      title: `${job.title} at ${job.companyName}`,
      subtitle: `Target Focus: Driving high-leverage execution in ${job.location}`,
      keyPoints: [
        `Company Core: ${job.companyName} is searching for leadership in ${job.category}.`,
        `Core Expectation: ${job.responsibilities[0] || 'Deliver scalable organizational impact.'}`,
        `Candidate Angle: Position your experience as directly lowering execution risk for the team.`
      ],
      caption: `Welcome ${candidateName}. In this 60-second mock briefing, we've analyzed the job description for ${job.title} at ${job.companyName} against your resume. Let's conquer this interview.`
    },
    {
      id: 2,
      timeStart: 12,
      timeEnd: 26,
      badge: '02 · Top 3 Recruiter Questions',
      title: 'High-Probability Interview Questions',
      subtitle: 'Prepare concrete STAR answers for these exact scenarios:',
      keyPoints: [
        `Q1: "Tell me about a complex challenge you solved related to: ${job.requirements[0] || 'core technical requirements'}?"`,
        `Q2: "How do you align cross-functional stakeholder expectations across ${job.workArrangement} environments?"`,
        `Q3: "Describe how you prioritize workload when delivery constraints shift unexpectedly."`
      ],
      caption: `Expect questions that test your concrete past outcomes rather than textbook definitions. Use the STAR method: Situation, Task, Action, and Quantified Result.`
    },
    {
      id: 3,
      timeStart: 26,
      timeEnd: 42,
      badge: '03 · Your Matched Strengths',
      title: 'Resume Alignment & Differentiators',
      subtitle: `Highlighting your proven skills vs. role requirements`,
      keyPoints: [
        `Key Matched Strengths: ${candidateSkills.length > 0 ? candidateSkills.join(', ') : 'Domain expertise, problem-solving, strategic agility'}.`,
        `Market Benchmark: Remuneration set at ${job.salaryRange} (${job.currency}) reflecting verified market standards.`,
        `Value Pitch: Tie your background directly to: "${job.responsibilities[1] || job.description.slice(0, 80)}..."`
      ],
      caption: `Your profile brings strong alignment with ${candidateSkills.slice(0, 2).join(' and ') || 'the core qualifications'}. Lead with measurable achievements that prove your ability to hit the ground running.`
    },
    {
      id: 4,
      timeStart: 42,
      timeEnd: 54,
      badge: '04 · Pitfall Watch & Strategy',
      title: 'What to Avoid & Salary Navigation',
      subtitle: 'Critical watch-outs for this specific panel',
      keyPoints: [
        `Avoid vague generalities: Provide specific metrics (e.g. percentages, team sizes, budgets).`,
        `Demonstrate company awareness: Reference ${job.companyName}'s mission and recent regional traction.`,
        `Salary transparency: Anchor your expectation around the posted ${job.salaryRange} range.`
      ],
      caption: `Watch out for generic answers. Anchor every response in real numbers and mention how you plan to contribute to ${job.companyName}'s growth within your first 90 days.`
    },
    {
      id: 5,
      timeStart: 54,
      timeEnd: 60,
      badge: '05 · Power Closing Question',
      title: 'Final 5-Second Confidence Anchor',
      subtitle: 'Leave a lasting impression on the interview panel',
      keyPoints: [
        `Closing Question to ask: "What does success look like in the first 90 days for this ${job.title} role?"`,
        `Next Step: Confirm interview logistics & maintain a warm, confident demeanor.`
      ],
      caption: `Wrap up with curiosity and confidence. Ask what success looks like in the first 90 days. You are thoroughly prepared—go crush this interview!`
    }
  ];

  // Current active scene
  const activeScene = scenes.find(s => currentTime >= s.timeStart && currentTime < s.timeEnd) || scenes[scenes.length - 1];

  // Speech synthesis voiceover simulation
  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 60) {
            setIsPlaying(false);
            return 60;
          }
          return Math.min(60, prev + 1);
        });
      }, 1000 / speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isOpen, speed]);

  // Voiceover narrator using browser SpeechSynthesis if unmuted
  useEffect(() => {
    if (!isOpen || !isPlaying || isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Speak caption on scene change
    if (activeScene) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeScene.caption);
      utterance.rate = 1.05 * speed;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeScene?.id, isPlaying, isMuted, isOpen, speed]);

  if (!isOpen) return null;

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (newSec: number) => {
    setCurrentTime(Math.min(60, Math.max(0, newSec)));
  };

  const handleDownloadScript = () => {
    const scriptContent = `NextSoftHR AI Mock Interview Prep Summary (60-Second Video Briefing)
Candidate: ${candidateName}
Target Position: ${job.title}
Company: ${job.companyName}
Location: ${job.location} (${job.workArrangement})
Salary Benchmark: ${job.salaryRange} (${job.currency})
Generated At: ${new Date().toLocaleString()}

========================================================================
SCENE BREAKDOWN (60 SECONDS):
========================================================================

${scenes.map(s => `[${String(Math.floor(s.timeStart / 60)).padStart(2, '0')}:${String(s.timeStart % 60).padStart(2, '0')} - ${String(Math.floor(s.timeEnd / 60)).padStart(2, '0')}:${String(s.timeEnd % 60).padStart(2, '0')}] ${s.title.toUpperCase()}
${s.subtitle}
Key Takeaways:
${s.keyPoints.map(k => ` - ${k}`).join('\n')}

Narration Voiceover:
"${s.caption}"
`).join('\n------------------------------------------------------------------------\n')}
`;

    const blob = new Blob([scriptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Interview_Prep_Briefing_${job.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    if (onToast) onToast('📋 60-Second Mock Interview Script downloaded!');
  };

  const remainingSeconds = Math.max(0, 60 - currentTime);
  const minutesDisplay = Math.floor(currentTime / 60);
  const secondsDisplay = String(currentTime % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className="bg-slate-950 text-white rounded-3xl shadow-2xl border border-slate-800 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                  AI Talent Video Studio
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  60-Second Briefing
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Mock Interview Prep Video · {job.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'video' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Video Player
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('script')}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  activeTab === 'script' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Script
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeTab === 'video' ? (
            <div className="space-y-4">
              {/* Cinematic 16:9 Video Simulation Screen */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-800 shadow-2xl flex flex-col justify-between p-6 sm:p-8">
                
                {/* Visual Background Lighting & Ambient Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />

                {/* Top Video HUD Strip */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40 font-mono text-[11px] font-bold">
                      {activeScene.badge}
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline">
                      {job.companyName}
                    </span>
                  </div>

                  {/* 60s Countdown Timer */}
                  <div className="flex items-center gap-2 font-mono tabular-nums bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 font-bold text-xs sm:text-sm">
                      {minutesDisplay}:{secondsDisplay} / 01:00
                    </span>
                    <span className="text-slate-500 text-[10px] hidden sm:inline">
                      ({remainingSeconds}s remaining)
                    </span>
                  </div>
                </div>

                {/* Center Dynamic Video Scene Presentation */}
                <div className="relative z-10 my-auto space-y-4 max-w-2xl">
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight animate-in fade-in duration-300">
                      {activeScene.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
                      {activeScene.subtitle}
                    </p>
                  </div>

                  {/* Scene Takeaways Box */}
                  <div className="p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80 space-y-2 text-xs">
                    {activeScene.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Animated Waveform Equalizer (simulating AI voice narration) */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1 h-5">
                      {[4, 8, 14, 20, 12, 18, 22, 10, 16, 6, 12, 18].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            height: isPlaying ? `${Math.max(4, (h * (i % 2 === 0 ? 1 : 0.8)))}px` : '4px',
                            transition: 'height 0.2s ease-in-out'
                          }}
                          className={`w-1 rounded-full ${
                            isPlaying ? 'bg-gradient-to-t from-emerald-500 to-blue-400' : 'bg-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {isPlaying ? (isMuted ? 'Muted voiceover' : 'Narrating key focus points...') : 'Video paused'}
                    </span>
                  </div>
                </div>

                {/* Bottom Synchronized Captions Bar */}
                <div className="relative z-10 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-center">
                  <p className="text-xs text-white/95 font-medium leading-relaxed italic">
                    "{activeScene.caption}"
                  </p>
                </div>
              </div>

              {/* Player Timeline Scrubber Bar */}
              <div className="space-y-2 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono tabular-nums">{minutesDisplay}:{secondsDisplay}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    {scenes.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSeek(s.timeStart)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          currentTime >= s.timeStart && currentTime < s.timeEnd
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Ch.{s.id}
                      </button>
                    ))}
                  </div>
                  <span className="font-mono tabular-nums">01:00</span>
                </div>

                {/* Scrubber input */}
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={currentTime}
                  onChange={(e) => handleSeek(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />

                {/* Player Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'Pause' : 'Play Briefing'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Restart from beginning (0:00)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1 text-[11px] bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                      {[1, 1.25, 1.5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSpeed(s)}
                          className={`px-1.5 py-0.5 rounded cursor-pointer ${
                            speed === s ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadScript}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>Download Script</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Script Transcript View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h4 className="font-bold text-sm text-white">
                    Personalized 60-Second Mock Interview Script
                  </h4>
                  <p className="text-xs text-slate-400">
                    AI-synthesized from {job.title} job specifications & {candidateName}'s parsed resume.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadScript}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .TXT</span>
                </button>
              </div>

              <div className="space-y-3">
                {scenes.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-400">{s.badge}</span>
                        <span className="font-bold text-white text-sm">{s.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {String(Math.floor(s.timeStart / 60)).padStart(2, '0')}:{String(s.timeStart % 60).padStart(2, '0')} - {String(Math.floor(s.timeEnd / 60)).padStart(2, '0')}:{String(s.timeEnd % 60).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium">{s.subtitle}</p>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Spoken Narration:
                      </span>
                      <p className="text-slate-200 italic leading-relaxed">
                        "{s.caption}"
                      </p>
                    </div>

                    <div className="space-y-1 pt-1">
                      {s.keyPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-slate-400 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
