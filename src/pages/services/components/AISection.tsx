import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  TrendingUp,
  FileText,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CornerDownLeft,
  User,
} from 'lucide-react';
import { AI_PROMPT_EXAMPLES } from '../data/servicesData';
import { AIPromptExample } from '../types';

interface AISectionProps {
  onOpenDemo: () => void;
  onOpenGetStarted: () => void;
}

export const AISection: React.FC<AISectionProps> = ({ onOpenDemo, onOpenGetStarted }) => {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>('');
  const [activeQueryText, setActiveQueryText] = useState<string>(AI_PROMPT_EXAMPLES[0].query);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const currentExample: AIPromptExample = AI_PROMPT_EXAMPLES[selectedPromptIndex];

  const handleSelectPreset = (idx: number) => {
    setSelectedPromptIndex(idx);
    setActiveQueryText(AI_PROMPT_EXAMPLES[idx].query);
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 250);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setActiveQueryText(customInput);
    // Find closest or show custom response
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setCustomInput('');
    }, 300);
  };

  return (
    <section
      id="ai-section"
      className="py-24 bg-gradient-to-b from-[#0A2540] via-[#0256C4] to-[#0A2540] text-white relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#84CC16]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-[#84CC16] text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
            MEET YOUR AI HR ASSISTANT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Your Intelligent HR Partner,{' '}
            <span className="text-[#84CC16] underline decoration-white/40 underline-offset-8">
              Available When You Need It
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
            Eliminate manual report building. Ask complex questions about leave, payroll anomalies, attendance trends,
            or policy guidance in plain English and receive instant, auditable answers.
          </p>
        </div>

        {/* Interactive Chat Console Workspace */}
        <div className="bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto">
          {/* Top Console Title Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0256C4] to-[#84CC16] flex items-center justify-center text-[#0A2540] font-black shadow-md">
                <Bot className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  NextSofthr Autonomous HR Copilot
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#84CC16]/20 text-[#84CC16]">
                    Private Cloud
                  </span>
                </h4>
                <span className="text-xs text-slate-400">
                  Role-sanitized tenant isolation • Zero data used for public LLM training
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#84CC16]" /> Enterprise Encrypted
            </div>
          </div>

          {/* Quick Preset Prompts requested in prompt */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Click an example prompt to simulate immediate AI answers:
            </span>
            <div className="flex flex-wrap gap-2">
              {AI_PROMPT_EXAMPLES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectPreset(idx)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all cursor-pointer text-left flex items-center gap-2 ${
                    selectedPromptIndex === idx
                      ? 'bg-[#84CC16] text-[#0A2540] border-[#84CC16] font-bold shadow-md shadow-lime-500/20'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3 h-3 shrink-0" />
                  <span>&ldquo;{item.query}&rdquo;</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversational Interaction Feed */}
          <div className="space-y-4 mb-6">
            {/* User Query Bubble */}
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-[#0256C4] text-white p-4 rounded-2xl rounded-tr-xs max-w-xl text-sm font-medium shadow-md">
                <div className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mb-1">
                  HR Director Query
                </div>
                &ldquo;{activeQueryText}&rdquo;
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white shrink-0 mt-1 text-xs font-bold">
                <User className="w-4 h-4" />
              </div>
            </div>

            {/* AI Response Card Bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#84CC16] text-[#0A2540] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 stroke-[2.5]" />
              </div>

              <div className="bg-slate-900 border border-slate-700/80 rounded-2xl rounded-tl-xs p-5 sm:p-6 max-w-3xl w-full text-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#84CC16] uppercase tracking-wider">
                      Verified Data Synthesis
                    </span>
                    <span className="text-[11px] text-slate-400">Instant query in 0.42s</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    Audit Log #NX-8492
                  </span>
                </div>

                {/* Summary narrative */}
                <p className="text-sm sm:text-base font-normal text-slate-100 leading-relaxed">
                  {currentExample.aiResponse.summary}
                </p>

                {/* Metrics Breakdown Grid */}
                {currentExample.aiResponse.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {currentExample.aiResponse.metrics.map((m, i) => (
                      <div key={i} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                        <div className="text-[11px] text-slate-400 font-medium">{m.label}</div>
                        <div className="text-base sm:text-lg font-bold text-white mt-0.5">{m.value}</div>
                        {m.note && (
                          <div className="text-[10px] text-[#84CC16] font-semibold mt-0.5">{m.note}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Structured Table / Item List */}
                {currentExample.aiResponse.tableData && (
                  <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-2">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Itemized Breakdown:
                    </div>
                    {currentExample.aiResponse.tableData.map((row, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1.5 border-b border-slate-800/60 last:border-0"
                      >
                        <span className="font-semibold text-white">{row.col1}</span>
                        <span className="text-slate-300">{row.col2}</span>
                        <span className="text-[11px] font-bold text-[#84CC16] bg-[#84CC16]/10 px-2 py-0.5 rounded w-max">
                          {row.col3}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Suggestion */}
                <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-blue-200">
                    <CheckCircle2 className="w-4 h-4 text-[#84CC16] shrink-0" />
                    <span>Recommended next step: {currentExample.aiResponse.actionSuggestion}</span>
                  </div>
                  <button
                    onClick={onOpenDemo}
                    className="shrink-0 text-xs font-bold text-[#84CC16] hover:underline"
                  >
                    Execute Workflow →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat Input Form */}
          <form onSubmit={handleCustomSubmit} className="relative">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything (e.g. 'Show departments with highest overtime this month')..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-5 pr-28 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#84CC16] hover:bg-[#73b612] text-[#0A2540] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Section Bottom CTA Button */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Ready to automate repetitive workforce inquiries across your enterprise?
            </span>
            <button
              onClick={onOpenGetStarted}
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0A2540] font-extrabold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore AI HR Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
