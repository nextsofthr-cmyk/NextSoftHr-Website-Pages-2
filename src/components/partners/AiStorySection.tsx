import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  TrendingDown, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  BarChart2, 
  FileText, 
  Users, 
  DollarSign, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AiStorySection: React.FC = () => {
  const { strings } = useLanguage();
  const ai = strings.ai;
  // Preset AI queries to let visitors test intelligence capabilities
  const aiPrompts = [
    {
      id: 'workforce-costs',
      label: 'Workforce Costs & Trends',
      query: "Analyse this company's workforce costs and identify payroll trends.",
      category: 'Payroll Analysis'
    },
    {
      id: 'hr-recommendations',
      label: 'AI HR Recommendations',
      query: 'Identify department turnover risks and recommend retention incentives.',
      category: 'AI HR Recommendations'
    },
    {
      id: 'policy-assistance',
      label: 'Policy Assistance',
      query: 'Draft a compliant hybrid-work and paternity leave policy for Nigeria & Kenya.',
      category: 'Policy Assistance'
    },
    {
      id: 'payroll-explanations',
      label: 'Payroll Variance',
      query: 'Explain why gross payroll increased 8.4% between March and April runs.',
      category: 'Payroll Explanations'
    }
  ];

  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const currentPrompt = aiPrompts[activePromptIndex];

  return (
    <section id="ai-platform" className="py-24 bg-slate-50 dark:bg-gradient-to-b dark:from-[#040E1F] dark:via-[#061833] dark:to-[#040E1F] border-t border-slate-200 dark:border-blue-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-[#B8F010]/40 text-xs font-bold text-blue-800 dark:text-[#B8F010] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{ai.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {ai.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {ai.subtitle}
          </p>
        </div>

        {/* AI Capabilities Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-4xl mx-auto">
          {[
            'AI HR Recommendations',
            'Payroll Analysis',
            'Employee Insights',
            'Workforce Analytics',
            'HR Report Generation',
            'Policy Assistance',
            'Employee Queries',
            'Payroll Explanations',
            'Business Insights'
          ].map((cap, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-blue-950/80 text-slate-700 dark:text-blue-200 border border-slate-200 dark:border-blue-800/80 hover:border-blue-500 dark:hover:border-[#B8F010] transition-colors shadow-xs"
            >
              ✦ {cap}
            </span>
          ))}
        </div>

        {/* Interactive AI Chat & Analytics Interface */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#030914] border-2 border-slate-200 dark:border-blue-700/80 shadow-xl dark:shadow-2xl overflow-hidden transition-colors duration-300">
          
          {/* Top Chat Bar */}
          <div className="bg-slate-100 dark:bg-[#071D3E] px-6 py-4 border-b border-slate-200 dark:border-blue-800 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#B8F010] flex items-center justify-center text-[#040E1F] shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  NextSofthr AI Workforce Intelligence Engine
                  <span className="w-2 h-2 rounded-full bg-[#B8F010] animate-pulse" />
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-blue-200">Grounded in verified company payroll records & local labor laws</span>
              </div>
            </div>

            <span className="text-[11px] font-mono text-blue-700 dark:text-[#B8F010] bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded border border-blue-200 dark:border-blue-800 hidden sm:inline-block font-bold">
              Model: NextGen HR-AI v4.2
            </span>
          </div>

          {/* Quick Query Switcher */}
          <div className="bg-slate-50 dark:bg-[#051329] px-6 py-3 border-b border-slate-200 dark:border-blue-900/60 flex items-center gap-2 overflow-x-auto transition-colors">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">Sample Queries:</span>
            {aiPrompts.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePromptIndex(idx)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-all ${
                  activePromptIndex === idx
                    ? 'bg-[#B8F010] text-[#040E1F] font-bold shadow-sm'
                    : 'bg-white dark:bg-blue-950 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-blue-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* User Message (Consultant Asking) */}
            <div className="flex items-start gap-3.5 justify-end">
              <div className="max-w-xl rounded-2xl rounded-tr-none bg-blue-600 dark:bg-blue-900/70 border border-blue-500 dark:border-blue-700 p-4 text-sm text-white shadow">
                <div className="text-[10px] uppercase font-bold text-blue-100 dark:text-blue-300 mb-1 flex items-center justify-between">
                  <span>HR Consultant Prompt</span>
                  <span>10:42 AM</span>
                </div>
                <p className="font-semibold text-white leading-relaxed">
                  &ldquo;{currentPrompt.query}&rdquo;
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 flex items-center justify-center text-xs font-bold text-blue-800 dark:text-blue-300 shrink-0">
                You
              </div>
            </div>

            {/* AI Assistant Response */}
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#B8F010] flex items-center justify-center text-[#040E1F] shrink-0 shadow">
                <Bot className="w-5 h-5" />
              </div>

              <div className="w-full max-w-3xl rounded-2xl rounded-tl-none bg-slate-50 dark:bg-[#071D3E] border border-slate-200 dark:border-blue-700/80 p-6 space-y-5 text-sm text-slate-700 dark:text-slate-200 shadow-sm dark:shadow-xl transition-colors">
                
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-blue-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                    <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                      Workforce Cost & Payroll Trend Analysis
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-blue-300 font-mono">Response time: 0.84s</span>
                </div>

                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                  I have analyzed the company&apos;s payroll history across 185 employees for Q1 and Q2. Overall gross payroll expenditures stand at <strong className="text-slate-900 dark:text-white font-semibold">₦24.8M / month ($18,200)</strong> with an effective tax burden of 18.2%.
                </p>

                {/* Visual Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-blue-950/90 border border-slate-200 dark:border-blue-800 shadow-xs">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Overtime Spending</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">₦1.42M</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
                      <TrendingDown className="w-3 h-3" /> Down 14% vs last month
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-blue-950/90 border border-slate-200 dark:border-blue-800 shadow-xs">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Department Variance</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">+8.4% Tech</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-300 flex items-center gap-1 mt-1 font-semibold">
                      <TrendingUp className="w-3 h-3" /> 3 Senior Engineering Hires
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/90 border border-blue-200 dark:border-[#B8F010]/30 shadow-xs">
                    <span className="text-[11px] text-blue-800 dark:text-[#B8F010] block mb-1 font-bold">Projected Q3 Savings</span>
                    <span className="text-lg font-black text-blue-800 dark:text-[#B8F010] font-mono">₦3.2M / mo</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 block mt-1 font-medium">Through automated leave offsets</span>
                  </div>
                </div>

                {/* AI Actionable Recommendations */}
                <div className="p-4 rounded-xl bg-white dark:bg-blue-950/70 border border-slate-200 dark:border-blue-800 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <Lightbulb className="w-4 h-4 text-blue-600 dark:text-[#B8F010]" />
                    <span>NextSofthr Strategic Recommendations for Consultant Presentation:</span>
                  </div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 pl-6 list-disc">
                    <li>Reconcile untracked casual staff overtime in the Logistics branch to save an estimated ₦840k monthly.</li>
                    <li>Ensure statutory pension remittances for the 14 newly confirmed probationers before the 10th of next month.</li>
                    <li>Present the automated tax calculation report directly to client CFO using 1-Click Executive PDF Export.</li>
                  </ul>
                </div>

                {/* Output action buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-blue-800/80">
                  <button className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 text-xs font-bold text-blue-800 dark:text-white border border-blue-200 dark:border-blue-700 flex items-center gap-1.5 transition-colors">
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                    Export Executive Summary (PDF)
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 text-xs font-bold text-blue-800 dark:text-white border border-blue-200 dark:border-blue-700 flex items-center gap-1.5 transition-colors">
                    <BarChart2 className="w-3.5 h-3.5 text-blue-600 dark:text-[#B8F010]" />
                    View Payroll Heatmap
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Interactive Input Bar Mockup */}
          <div className="bg-slate-100 dark:bg-[#071D3E] p-4 border-t border-slate-200 dark:border-blue-800 flex items-center gap-3 transition-colors">
            <div className="relative flex-1">
              <input
                type="text"
                readOnly
                value="Analyse this company's workforce costs and identify payroll trends."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-white dark:bg-blue-950 border border-slate-300 dark:border-blue-700 text-xs text-slate-800 dark:text-slate-200 cursor-default shadow-xs"
              />
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-[#B8F010] absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
            <button className="p-2.5 rounded-xl bg-[#B8F010] text-[#040E1F] font-bold hover:bg-[#CBFF1A] transition-colors shadow">
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
