import { useState, useRef, useCallback, type FormEvent } from 'react';
import { 
  Sparkles, Bot, Send, CheckCircle, FileText, ArrowRight, 
  HelpCircle, ShieldCheck, Zap, UserCheck, TrendingUp, 
  FileSpreadsheet, Clock, ShieldAlert, Award, BookOpen, BarChart3, Calculator,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { AI_PROMPTS, AI_CAPABILITIES } from '../data/mockData';
import { AiPromptOption } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface AiAssistantSectionProps {
  onOpenDemo: () => void;
  onOpenPayslip: () => void;
}

export const AiAssistantSection = ({ onOpenDemo, onOpenPayslip }: AiAssistantSectionProps) => {
  const { formatMoney, currencyInfo } = useCurrency();
  const [selectedPrompt, setSelectedPrompt] = useState<AiPromptOption>(AI_PROMPTS[0]);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [actionDone, setActionDone] = useState(false);

  // AI Capabilities slider state
  const [aiSliderPage, setAiSliderPage] = useState(0);
  const aiSliderRef = useRef<HTMLDivElement>(null);
  const aiItemsPerPage = 4;
  const aiTotalPages = Math.ceil(AI_CAPABILITIES.length / aiItemsPerPage);

  const goToAiPage = useCallback((page: number) => {
    const clamped = Math.max(0, Math.min(page, aiTotalPages - 1));
    setAiSliderPage(clamped);
    if (aiSliderRef.current) {
      const cardWidth = aiSliderRef.current.scrollWidth / AI_CAPABILITIES.length;
      aiSliderRef.current.scrollTo({ left: clamped * aiItemsPerPage * cardWidth, behavior: 'smooth' });
    }
  }, [aiTotalPages]);

  const localizeValue = (val: any): string => {
    if (!val || typeof val !== 'string') return val ? String(val) : '';
    if (val.startsWith('$')) {
      if (val.endsWith('M')) {
        const num = parseFloat(val.replace(/[$,M]/g, ''));
        if (!isNaN(num)) return formatMoney(num * 1_000_000, { compact: true });
      }
      if (val.endsWith('k') || val.endsWith('K')) {
        const num = parseFloat(val.replace(/[$,kK]/g, ''));
        if (!isNaN(num)) return formatMoney(num * 1_000, { compact: true });
      }
      const clean = parseFloat(val.replace(/[$,]/g, ''));
      if (!isNaN(clean)) {
        return formatMoney(clean);
      }
    }
    return val;
  };

  const iconMap: Record<string, any> = {
    Calculator,
    Sparkles,
    Bot,
    UserCheck,
    TrendingUp,
    FileSpreadsheet,
    FileText,
    Clock,
    ShieldAlert,
    Award,
    BookOpen,
    BarChart3
  };

  const handleSelectPrompt = (prompt: AiPromptOption) => {
    setIsTyping(true);
    setActionDone(false);
    setTimeout(() => {
      setSelectedPrompt(prompt);
      setIsTyping(false);
    }, 300);
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsTyping(true);
    setActionDone(false);
    
    // Check if query matches any known keywords
    const lower = customInput.toLowerCase();
    const matched = AI_PROMPTS.find(p => 
      p.query.toLowerCase().includes(lower) || 
      lower.includes('payroll') && p.id === 'payroll-calc' ||
      lower.includes('absent') && p.id === 'who-absent' ||
      lower.includes('leave') && p.id === 'leave-expires' ||
      lower.includes('overtime') && p.id === 'overtime-dept' ||
      lower.includes('contract') && p.id === 'contract-gen' ||
      lower.includes('cost') && p.id === 'workforce-costs' ||
      lower.includes('salary') && p.id === 'salary-review' ||
      lower.includes('policy') && p.id === 'hr-policy'
    );

    setTimeout(() => {
      if (matched) {
        setSelectedPrompt(matched);
      } else {
        // Dynamic simulated response for any custom user query
        setSelectedPrompt({
          id: 'custom-' + Date.now(),
          query: customInput,
          category: 'analytics',
          response: {
            summary: `NextSofthr AI processed "${customInput}". Scanned 2,840 employee profiles across 14 international legal entities.`,
            type: 'stat-grid',
            data: {
              totalSpend: "$842,500 Current Run",
              categories: [
                { label: 'Executive Status', pct: '100%', amount: 'Audited', trend: 'Optimal' },
                { label: 'Compliance Index', pct: '99.9%', amount: 'Passed', trend: 'Verified' },
                { label: 'Confidence Score', pct: '98.5%', amount: 'High', trend: 'AI Engine' }
              ]
            },
            insights: [
              `All relevant employment records and statutory brackets have been indexed.`,
              `Recommendation generated according to ISO 27001 data protection protocols.`
            ],
            actionLabel: "Export Detailed Analysis"
          }
        });
      }
      setIsTyping(false);
      setCustomInput('');
    }, 450);
  };

  const handleActionClick = () => {
    if (selectedPrompt.id === 'payroll-calc') {
      onOpenPayslip();
    } else {
      setActionDone(true);
      setTimeout(() => setActionDone(false), 3000);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            Next-Generation Workforce Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet Your AI HR & Payroll Assistant.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Get instant intelligent assistance with HR questions, payroll calculations, employee management, policies, compliance workflows and workforce insights.
          </p>
        </div>

        {/* Interactive Conversational Interface */}
        <div className="max-w-5xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden backdrop-blur-xl mb-16">
          
          {/* Chat Window Top Bar */}
          <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-lime-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-lime-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">NextSofthr Copilot</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-lime-400/20 text-lime-300 border border-lime-400/40">
                    Enterprise Model
                  </span>
                </div>
                <p className="text-xs text-slate-400">Trained on multi-country labor codes, tax brackets & payroll ledgers</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
              </span>
              <span className="text-xs text-lime-400 font-semibold">Live Operational Sync</span>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-700/50">
            <span className="text-xs font-semibold text-slate-400 block mb-2.5">
              Click a sample prompt or ask any HR/payroll question below:
            </span>
            <div className="flex flex-wrap gap-2">
              {AI_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSelectPrompt(prompt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center gap-1.5 ${
                    selectedPrompt.id === prompt.id
                      ? 'bg-blue-600 text-white font-semibold ring-2 ring-lime-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <span>{prompt.query}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Exchange Body */}
          <div className="p-6 space-y-6 min-h-[360px] max-h-[520px] overflow-y-auto">
            
            {/* User message bubble */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-blue-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-none text-sm max-w-md shadow-md">
                {selectedPrompt.query}
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-blue-400">
                You
              </div>
            </div>

            {/* AI Response message bubble */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-700 text-lime-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>

              <div className="flex-1 bg-slate-950/70 border border-slate-700/80 rounded-2xl rounded-tl-none p-5 text-sm space-y-4 shadow-lg">
                
                {isTyping ? (
                  <div className="flex items-center gap-2 py-4 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-lime-400 animate-bounce [animation-delay:0.4s]"></span>
                    <span>Synthesizing multi-jurisdiction workforce data...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-200 leading-relaxed font-medium">
                      {selectedPrompt.response.summary}
                    </p>

                    {/* Rich Data Tables / Cards based on response type */}
                    {selectedPrompt.response.type === 'table' && selectedPrompt.response.data && (
                      <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/80">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-800 text-slate-400 font-semibold border-b border-slate-700">
                            <tr>
                              <th className="p-2.5">Name / Department</th>
                              <th className="p-2.5">Details</th>
                              <th className="p-2.5">Figures / Return</th>
                              <th className="p-2.5">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-slate-300">
                            {selectedPrompt.response.data.breakdown?.map((item: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-800/40">
                                <td className="p-2.5 font-semibold text-white">
                                  {item.department || item.name}
                                </td>
                                <td className="p-2.5 text-slate-400">
                                  {item.role || `${item.employees} Staff`}
                                </td>
                                <td className="p-2.5 font-mono text-lime-400">
                                  {localizeValue(item.gross || item.currentSalary || item.returnDate || item.status)}
                                </td>
                                <td className="p-2.5">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-lime-400/10 text-lime-300 border border-lime-400/30">
                                    {item.status || item.handoverStatus || item.rating || 'Verified'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Stat-grid view for overtime / costs */}
                    {selectedPrompt.response.type === 'stat-grid' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {(selectedPrompt.response.data.departments || selectedPrompt.response.data.categories)?.map((stat: any, idx: number) => (
                          <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-700/80">
                            <span className="text-[11px] text-slate-400 block truncate font-medium">
                              {stat.name || stat.label}
                            </span>
                            <div className="text-base font-extrabold text-white mt-1 font-mono">
                              {localizeValue(stat.hours || stat.amount)}
                            </div>
                            <div className="text-[10px] text-lime-400 mt-0.5 flex items-center justify-between">
                              <span>{localizeValue(stat.cost || stat.pct)}</span>
                              <span className="text-slate-400 font-semibold">{stat.alert || stat.trend}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Document draft preview */}
                    {selectedPrompt.response.type === 'document' && selectedPrompt.response.data && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 font-mono text-xs text-slate-300 space-y-2">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-lime-400 font-sans font-bold">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            {selectedPrompt.response.data.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-lime-400/20 rounded text-lime-300 border border-lime-400/30">
                            e-Sign Ready
                          </span>
                        </div>
                        {(selectedPrompt.response.data.clauses || selectedPrompt.response.data.sections)?.map((clause: string, idx: number) => (
                          <div key={idx} className="text-slate-400 py-0.5">
                            • {clause}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Strategic Insights */}
                    {selectedPrompt.response.insights && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-xs font-bold text-lime-400 uppercase tracking-wider block">
                          Key AI Recommendations:
                        </span>
                        {selectedPrompt.response.insights.map((insight: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action trigger button */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleActionClick}
                        className="px-4 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md"
                      >
                        <span>{selectedPrompt.response.actionLabel || 'Apply Recommendation'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {actionDone && (
                        <span className="text-xs font-semibold text-lime-400 animate-fadeIn flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" /> Action executed in live environment!
                        </span>
                      )}
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>

          {/* User Input Bar */}
          <form onSubmit={handleCustomSubmit} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything: e.g. 'Show employees with overtime' or 'Generate payroll report'..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-2.5 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </div>

        {/* 12 AI Capabilities Slider */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise-Grade AI Capabilities
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              From continuous anomaly scanning to predictive workforce planning, NextSofthr embeds intelligence at every touchpoint.
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => goToAiPage(aiSliderPage - 1)}
              disabled={aiSliderPage === 0}
              className={`absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                aiSliderPage === 0
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-lime-400 hover:text-slate-950 border border-slate-700 hover:border-lime-400'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => goToAiPage(aiSliderPage + 1)}
              disabled={aiSliderPage >= aiTotalPages - 1}
              className={`absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                aiSliderPage >= aiTotalPages - 1
                  ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-lime-400 hover:text-slate-950 border border-slate-700 hover:border-lime-400'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={aiSliderRef}
              className="overflow-hidden"
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${aiSliderPage * 100}%)` }}
              >
                {AI_CAPABILITIES.map((cap, idx) => {
                  const IconComp = iconMap[cap.icon] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="w-full sm:w-1/2 lg:w-1/4 shrink-0 px-2"
                    >
                      <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-lime-400/50 transition-all hover:-translate-y-1 group h-full">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-lime-400 flex items-center justify-center mb-3 group-hover:bg-lime-400 group-hover:text-slate-950 transition-colors">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-base text-white group-hover:text-lime-300 transition-colors">
                          {cap.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: aiTotalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToAiPage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === aiSliderPage
                    ? 'w-8 h-3 bg-lime-400'
                    : 'w-3 h-3 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* AI Call to action banner */}
          <div className="mt-12 text-center">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-lg hover:shadow-xl"
            >
              <span>Schedule an AI Assistant Walkthrough</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
