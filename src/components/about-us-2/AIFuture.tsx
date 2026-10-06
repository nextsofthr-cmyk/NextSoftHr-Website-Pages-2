import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  Shield,
  Layers,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { AI_ASSISTANT_SAMPLES } from '../data/contentData';

export const AIFuture: React.FC = () => {
  const [activeSampleId, setActiveSampleId] = useState<string>('payroll-audit');
  const [customInput, setCustomInput] = useState<string>('');
  const [liveResponse, setLiveResponse] = useState<string | null>(null);

  const activeSample =
    AI_ASSISTANT_SAMPLES.find((s) => s.id === activeSampleId) || AI_ASSISTANT_SAMPLES[0];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setLiveResponse(
      `NextSofthr AI processed query: "${customInput}". Generated intelligent cross-entity summary referencing current Nigerian & regional workforce metrics, verified tax regulations, and employee active rosters.`
    );
  };

  const aiDataConnections = [
    { label: 'HR & Personnel Data', desc: 'Secure profile records & org charts' },
    { label: 'Payroll Information', desc: 'Pre-computed variance checks & deductions' },
    { label: 'Attendance & Clock-Ins', desc: 'Geo-stamped hours & shift rosters' },
    { label: 'Leave & PTO Status', desc: 'Real-time department coverage analysis' },
    { label: 'Statutory Reports', desc: 'Audit-ready schedules for revenue services' },
    { label: 'Executive Insights', desc: 'Actionable workforce expenditure trends' },
  ];

  return (
    <section id="ai-future" className="py-20 lg:py-28 bg-[#0A2540] dark:bg-[#06101E] text-white relative overflow-hidden border-b border-slate-800 transition-colors duration-300">
      {/* Subtle Glows */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-xs font-bold text-[#84CC16]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Enterprise Assistance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Building the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-[#84CC16]">
              Intelligent Business Management
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            NextSofthr harnesses responsible AI to turn tedious administrative legwork into
            instant, verified insights—empowering managers to query workforce data with natural clarity.
          </p>
        </div>

        {/* Interactive AI Assistant Simulator */}
        <div className="bg-slate-900/90 dark:bg-[#081526]/95 rounded-3xl border border-white/15 dark:border-blue-900/40 shadow-2xl overflow-hidden backdrop-blur-xl transition-colors duration-300">
          {/* Assistant Header Bar */}
          <div className="bg-[#0B3B73]/60 px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#84CC16] text-[#0A2540] flex items-center justify-center font-bold shadow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>NextSofthr Co-Pilot Engine</span>
                  <span className="bg-[#84CC16]/20 text-[#84CC16] text-[10px] font-bold px-2 py-0.5 rounded">
                    Connected to Platform Data
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Natural language assistance across HR, Payroll, Leave & Operations
                </div>
              </div>
            </div>

            {/* Quick Sample Query Buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {AI_ASSISTANT_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    setActiveSampleId(sample.id);
                    setLiveResponse(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeSampleId === sample.id && !liveResponse
                      ? 'bg-[#84CC16] text-[#0A2540]'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {sample.category}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat & Visual Data Response Area */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Simulated Conversational Query */}
            <div className="lg:col-span-7 space-y-4">
              {/* User Prompt Bubble */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-[#0B3B73] border border-blue-400/30 text-white text-xs sm:text-sm p-4 rounded-2xl rounded-tr-sm max-w-lg shadow-md">
                  <div className="text-[10px] font-bold text-blue-200 mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#84CC16]" /> HR Director / Executive Query
                  </div>
                  {liveResponse ? customInput : activeSample.prompt}
                </div>
              </div>

              {/* AI Response Card */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#84CC16] text-[#0A2540] flex items-center justify-center shrink-0 mt-1 shadow">
                  <Bot className="w-4 h-4" />
                </div>

                <div className="bg-white/5 border border-white/15 rounded-2xl rounded-tl-sm p-5 text-xs text-slate-200 space-y-4 w-full backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white text-sm flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#84CC16]" />
                      {liveResponse ? 'Custom Query Assessment' : activeSample.response.title}
                    </span>
                    <span className="text-[10px] text-slate-400">Verified Platform Audit</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {liveResponse ? liveResponse : activeSample.response.summary}
                  </p>

                  {/* Dynamic Metrics Data Points */}
                  {!liveResponse && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {activeSample.response.dataPoints.map((dp, idx) => (
                        <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-white/10">
                          <div className="text-[10px] text-slate-400">{dp.label}</div>
                          <div className="text-sm font-extrabold text-white mt-0.5">{dp.value}</div>
                          {dp.badge && (
                            <span className="inline-block mt-1 text-[9px] font-bold bg-[#84CC16]/20 text-[#84CC16] px-1.5 py-0.2 rounded">
                              {dp.badge}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Action Items */}
                  {!liveResponse && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#84CC16]">
                        Automated Recommendations:
                      </div>
                      {activeSample.response.actionItems.map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#84CC16] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Try Custom Query Input */}
              <form onSubmit={handleCustomSubmit} className="pt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about payroll, shift coverages, or tax brackets..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#84CC16]"
                />
                <button
                  type="submit"
                  className="bg-[#84CC16] hover:bg-[#74be12] text-[#0A2540] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Query</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Right Column: Connected Data Pillars */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#84CC16]">
                  Connected Business Data
                </span>
                <span className="text-[10px] text-slate-400">Strict Permission Guards</span>
              </div>

              <div className="space-y-3">
                {aiDataConnections.map((conn) => (
                  <div key={conn.label} className="flex items-center justify-between p-2.5 bg-slate-800/60 rounded-xl text-xs">
                    <div>
                      <div className="font-bold text-white">{conn.label}</div>
                      <div className="text-[11px] text-slate-400">{conn.desc}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 italic">
                * NextSofthr AI operates strictly on verified enterprise permissions. No sensitive employee compensation or personal data is ever shared externally.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
