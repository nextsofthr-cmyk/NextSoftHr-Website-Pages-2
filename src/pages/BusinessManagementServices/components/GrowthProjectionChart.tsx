import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';

type MetricType = 'headcount' | 'hours' | 'cost';
type ScenarioType = 'midmarket' | 'scaleup' | 'enterprise';

interface DataPoint {
  month: string;
  withNextSoft: number;
  baseline: number;
  efficiencyRate: number;
  milestone?: string;
}

const SCENARIO_DATA: Record<ScenarioType, Record<MetricType, DataPoint[]>> = {
  midmarket: {
    headcount: [
      { month: 'M1', withNextSoft: 120, baseline: 120, efficiencyRate: 60, milestone: 'HR Cloud Setup' },
      { month: 'M2', withNextSoft: 180, baseline: 130, efficiencyRate: 68 },
      { month: 'M3', withNextSoft: 290, baseline: 145, efficiencyRate: 76, milestone: 'Auto-Payroll & PAYE' },
      { month: 'M4', withNextSoft: 420, baseline: 160, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 580, baseline: 180, efficiencyRate: 87 },
      { month: 'M6', withNextSoft: 750, baseline: 195, efficiencyRate: 91, milestone: 'Biometric Terminals' },
      { month: 'M8', withNextSoft: 1050, baseline: 220, efficiencyRate: 94 },
      { month: 'M10', withNextSoft: 1340, baseline: 250, efficiencyRate: 96 },
      { month: 'M12', withNextSoft: 1680, baseline: 280, efficiencyRate: 98, milestone: 'Enterprise AI Suite' },
    ],
    hours: [
      { month: 'M1', withNextSoft: 38, baseline: 10, efficiencyRate: 60 },
      { month: 'M2', withNextSoft: 95, baseline: 22, efficiencyRate: 68 },
      { month: 'M3', withNextSoft: 210, baseline: 36, efficiencyRate: 76 },
      { month: 'M4', withNextSoft: 380, baseline: 52, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 590, baseline: 70, efficiencyRate: 87 },
      { month: 'M6', withNextSoft: 890, baseline: 90, efficiencyRate: 91 },
      { month: 'M8', withNextSoft: 1580, baseline: 130, efficiencyRate: 94 },
      { month: 'M10', withNextSoft: 2420, baseline: 175, efficiencyRate: 96 },
      { month: 'M12', withNextSoft: 3450, baseline: 220, efficiencyRate: 98 },
    ],
    cost: [
      { month: 'M1', withNextSoft: 1400, baseline: 300, efficiencyRate: 60 },
      { month: 'M2', withNextSoft: 3200, baseline: 650, efficiencyRate: 68 },
      { month: 'M3', withNextSoft: 7400, baseline: 1100, efficiencyRate: 76 },
      { month: 'M4', withNextSoft: 12800, baseline: 1700, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 19500, baseline: 2300, efficiencyRate: 87 },
      { month: 'M6', withNextSoft: 27900, baseline: 3000, efficiencyRate: 91 },
      { month: 'M8', withNextSoft: 42000, baseline: 4200, efficiencyRate: 94 },
      { month: 'M10', withNextSoft: 58500, baseline: 5500, efficiencyRate: 96 },
      { month: 'M12', withNextSoft: 76800, baseline: 6800, efficiencyRate: 98 },
    ],
  },
  scaleup: {
    headcount: [
      { month: 'M1', withNextSoft: 35, baseline: 35, efficiencyRate: 55, milestone: 'Onboarding' },
      { month: 'M2', withNextSoft: 55, baseline: 40, efficiencyRate: 65 },
      { month: 'M3', withNextSoft: 95, baseline: 48, efficiencyRate: 75, milestone: 'Payroll Automation' },
      { month: 'M4', withNextSoft: 140, baseline: 55, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 195, baseline: 62, efficiencyRate: 88 },
      { month: 'M6', withNextSoft: 260, baseline: 70, efficiencyRate: 92, milestone: 'Mobile Self-Service' },
      { month: 'M8', withNextSoft: 380, baseline: 82, efficiencyRate: 95 },
      { month: 'M10', withNextSoft: 490, baseline: 95, efficiencyRate: 97 },
      { month: 'M12', withNextSoft: 620, baseline: 110, efficiencyRate: 99, milestone: 'Multi-Branch' },
    ],
    hours: [
      { month: 'M1', withNextSoft: 18, baseline: 5, efficiencyRate: 55 },
      { month: 'M2', withNextSoft: 48, baseline: 12, efficiencyRate: 65 },
      { month: 'M3', withNextSoft: 110, baseline: 20, efficiencyRate: 75 },
      { month: 'M4', withNextSoft: 195, baseline: 30, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 310, baseline: 42, efficiencyRate: 88 },
      { month: 'M6', withNextSoft: 470, baseline: 55, efficiencyRate: 92 },
      { month: 'M8', withNextSoft: 820, baseline: 78, efficiencyRate: 95 },
      { month: 'M10', withNextSoft: 1280, baseline: 105, efficiencyRate: 97 },
      { month: 'M12', withNextSoft: 1850, baseline: 135, efficiencyRate: 99 },
    ],
    cost: [
      { month: 'M1', withNextSoft: 650, baseline: 150, efficiencyRate: 55 },
      { month: 'M2', withNextSoft: 1600, baseline: 350, efficiencyRate: 65 },
      { month: 'M3', withNextSoft: 3800, baseline: 650, efficiencyRate: 75 },
      { month: 'M4', withNextSoft: 6900, baseline: 1000, efficiencyRate: 82 },
      { month: 'M5', withNextSoft: 10800, baseline: 1400, efficiencyRate: 88 },
      { month: 'M6', withNextSoft: 15400, baseline: 1850, efficiencyRate: 92 },
      { month: 'M8', withNextSoft: 23600, baseline: 2500, efficiencyRate: 95 },
      { month: 'M10', withNextSoft: 33400, baseline: 3200, efficiencyRate: 97 },
      { month: 'M12', withNextSoft: 44200, baseline: 4000, efficiencyRate: 99 },
    ],
  },
  enterprise: {
    headcount: [
      { month: 'M1', withNextSoft: 450, baseline: 450, efficiencyRate: 70, milestone: 'HQ Centralization' },
      { month: 'M2', withNextSoft: 820, baseline: 490, efficiencyRate: 75 },
      { month: 'M3', withNextSoft: 1450, baseline: 540, efficiencyRate: 80, milestone: 'Full Tax & Pensions' },
      { month: 'M4', withNextSoft: 2100, baseline: 600, efficiencyRate: 85 },
      { month: 'M5', withNextSoft: 2900, baseline: 670, efficiencyRate: 89 },
      { month: 'M6', withNextSoft: 3800, baseline: 740, efficiencyRate: 93, milestone: 'Turnstile Terminals' },
      { month: 'M8', withNextSoft: 5100, baseline: 860, efficiencyRate: 96 },
      { month: 'M10', withNextSoft: 6400, baseline: 980, efficiencyRate: 98 },
      { month: 'M12', withNextSoft: 8200, baseline: 1120, efficiencyRate: 99, milestone: 'Global Multi-Entity' },
    ],
    hours: [
      { month: 'M1', withNextSoft: 120, baseline: 35, efficiencyRate: 70 },
      { month: 'M2', withNextSoft: 340, baseline: 80, efficiencyRate: 75 },
      { month: 'M3', withNextSoft: 780, baseline: 140, efficiencyRate: 80 },
      { month: 'M4', withNextSoft: 1420, baseline: 220, efficiencyRate: 85 },
      { month: 'M5', withNextSoft: 2250, baseline: 310, efficiencyRate: 89 },
      { month: 'M6', withNextSoft: 3400, baseline: 420, efficiencyRate: 93 },
      { month: 'M8', withNextSoft: 5900, baseline: 650, efficiencyRate: 96 },
      { month: 'M10', withNextSoft: 8800, baseline: 900, efficiencyRate: 98 },
      { month: 'M12', withNextSoft: 12600, baseline: 1200, efficiencyRate: 99 },
    ],
    cost: [
      { month: 'M1', withNextSoft: 4800, baseline: 1100, efficiencyRate: 70 },
      { month: 'M2', withNextSoft: 11500, baseline: 2400, efficiencyRate: 75 },
      { month: 'M3', withNextSoft: 25000, baseline: 4200, efficiencyRate: 80 },
      { month: 'M4', withNextSoft: 44000, baseline: 6500, efficiencyRate: 85 },
      { month: 'M5', withNextSoft: 68000, baseline: 9200, efficiencyRate: 89 },
      { month: 'M6', withNextSoft: 98000, baseline: 12500, efficiencyRate: 93 },
      { month: 'M8', withNextSoft: 148000, baseline: 18000, efficiencyRate: 96 },
      { month: 'M10', withNextSoft: 205000, baseline: 24000, efficiencyRate: 98 },
      { month: 'M12', withNextSoft: 275000, baseline: 31000, efficiencyRate: 99 },
    ],
  },
};

const METRIC_CONFIG: Record<
  MetricType,
  {
    title: string;
    description: string;
    unit: string;
    formatValue: (val: number) => string;
    primaryLabel: string;
    baselineLabel: string;
    icon: typeof TrendingUp;
  }
> = {
  headcount: {
    title: 'Managed Headcount & Scaling Capacity',
    description: 'Active employees onboarded, tracked, and managed seamlessly across all branches',
    unit: 'Employees',
    formatValue: (val: number) => `${val.toLocaleString()} Staff`,
    primaryLabel: 'NextSofthr Automated Platform',
    baselineLabel: 'Legacy Manual Processes',
    icon: Users,
  },
  hours: {
    title: 'Cumulative Administrative Hours Saved',
    description: 'Finance and HR work hours reclaimed from manual payroll calculation, spreadsheets, and leave queries',
    unit: 'Hours',
    formatValue: (val: number) => `${val.toLocaleString()} hrs`,
    primaryLabel: 'Hours Saved via Automation',
    baselineLabel: 'Manual Spreadsheets Baseline',
    icon: Clock,
  },
  cost: {
    title: 'Operational Cost Savings & ROI ($ USD)',
    description: 'Net financial savings from eliminating payroll discrepancies, ghost workers, and tax non-compliance fines',
    unit: 'USD',
    formatValue: (val: number) => `$${val.toLocaleString()}`,
    primaryLabel: 'NextSofthr Verified ROI',
    baselineLabel: 'Unoptimized Manual Operations',
    icon: DollarSign,
  },
};

export const GrowthProjectionChart: React.FC = () => {
  const [metric, setMetric] = useState<MetricType>('headcount');
  const [scenario, setScenario] = useState<ScenarioType>('midmarket');
  const [showBaseline, setShowBaseline] = useState<boolean>(true);

  const currentConfig = METRIC_CONFIG[metric];
  const chartData = useMemo(() => SCENARIO_DATA[scenario][metric], [scenario, metric]);

  const latestPoint = chartData[chartData.length - 1];
  const firstPoint = chartData[0];
  const totalGrowthMultiplier = (
    latestPoint.withNextSoft / Math.max(firstPoint.withNextSoft, 1)
  ).toFixed(1);

  return (
    <div className="mt-14 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-white/10 shadow-2xl transition-all">
      {/* Visual Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/15">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-[#84CC16] text-[#0A2540] px-2.5 py-0.5 rounded-full">
              <Activity className="w-3 h-3" /> Real Client Growth Projection
            </span>
            <span className="text-xs text-blue-200/80 hidden sm:inline">• 12-Month Longitudinal Model</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <span>{currentConfig.title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-2xl">
            {currentConfig.description}
          </p>
        </div>

        {/* Top summary badge */}
        <div className="flex items-center gap-3 bg-white/10 dark:bg-black/20 px-4 py-2.5 rounded-2xl border border-white/10 self-start lg:self-auto">
          <div className="w-10 h-10 rounded-xl bg-[#84CC16]/20 flex items-center justify-center text-[#84CC16]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] text-blue-200 font-semibold uppercase">Projected 12-Mo Scale</div>
            <div className="text-lg sm:text-xl font-black text-[#84CC16]">
              {currentConfig.formatValue(latestPoint.withNextSoft)}
              <span className="text-xs text-white/80 font-normal ml-1.5">({totalGrowthMultiplier}x scale)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Metric Switcher & Organization Tier */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 flex-wrap">
        {/* Metric selection pills */}
        <div className="flex items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => setMetric('headcount')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              metric === 'headcount'
                ? 'bg-[#84CC16] text-[#0A2540] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Managed Headcount</span>
          </button>

          <button
            onClick={() => setMetric('hours')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              metric === 'hours'
                ? 'bg-[#84CC16] text-[#0A2540] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Admin Hours Saved</span>
          </button>

          <button
            onClick={() => setMetric('cost')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              metric === 'cost'
                ? 'bg-[#84CC16] text-[#0A2540] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>ROI &amp; Cost Savings</span>
          </button>
        </div>

        {/* Client Scenario & Baseline toggle */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-blue-200">
            <span className="font-semibold text-white/90">Org Profile:</span>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as ScenarioType)}
              className="bg-black/30 text-white font-bold text-xs rounded-xl px-2.5 py-1.5 border border-white/20 focus:outline-none focus:ring-1 focus:ring-[#84CC16] cursor-pointer"
            >
              <option value="scaleup" className="bg-[#0A2540] text-white">Scale-Up (30–600 staff)</option>
              <option value="midmarket" className="bg-[#0A2540] text-white">Mid-Market (100–1,700 staff)</option>
              <option value="enterprise" className="bg-[#0A2540] text-white">Enterprise Conglomerate (500–8,000+)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-white/90 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showBaseline}
              onChange={(e) => setShowBaseline(e.target.checked)}
              className="w-3.5 h-3.5 rounded accent-[#84CC16] cursor-pointer"
            />
            <span className="text-blue-100">Compare Legacy Baseline</span>
          </label>
        </div>
      </div>

      {/* Main Recharts Container */}
      <div className="w-full h-[320px] sm:h-[380px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
          >
            <defs>
              {/* Green gradient for NextSofthr projected growth */}
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84CC16" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#84CC16" stopOpacity={0.0} />
              </linearGradient>

              {/* Blue subtle gradient for baseline */}
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 12, fontWeight: 600 }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
            />

            <YAxis
              stroke="rgba(255, 255, 255, 0.7)"
              tick={{ fill: 'rgba(255, 255, 255, 0.8)', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickLine={{ stroke: 'rgba(255, 255, 255, 0.2)' }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
                }
                return `${value}`;
              }}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const point = payload[0].payload as DataPoint;

                return (
                  <div className="bg-[#0A2540]/95 backdrop-blur-md p-4 rounded-2xl border border-[#84CC16]/40 shadow-2xl text-white text-xs max-w-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-white/15 pb-2">
                      <span className="font-extrabold text-[#84CC16] text-sm">
                        {label} Projection
                      </span>
                      {point.milestone && (
                        <span className="text-[10px] uppercase font-black bg-[#84CC16]/20 text-[#84CC16] px-2 py-0.5 rounded-full">
                          {point.milestone}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-blue-100 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16]" />
                          {currentConfig.primaryLabel}:
                        </span>
                        <span className="font-extrabold text-white">
                          {currentConfig.formatValue(point.withNextSoft)}
                        </span>
                      </div>

                      {showBaseline && (
                        <div className="flex items-center justify-between gap-4 text-white/70">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                            {currentConfig.baselineLabel}:
                          </span>
                          <span className="font-semibold">
                            {currentConfig.formatValue(point.baseline)}
                          </span>
                        </div>
                      )}

                      <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-[11px] text-[#84CC16]">
                        <span>Operational Accuracy:</span>
                        <span className="font-black">{point.efficiencyRate}% (Zero Penalties)</span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-white/90 text-xs font-semibold mr-3">{value}</span>
              )}
            />

            {/* Legacy Baseline Line */}
            {showBaseline && (
              <Line
                name={currentConfig.baselineLabel}
                type="monotone"
                dataKey="baseline"
                stroke="#38BDF8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#38BDF8', strokeWidth: 1 }}
                activeDot={{ r: 5 }}
              />
            )}

            {/* NextSofthr Projected Curve */}
            <Area
              name={currentConfig.primaryLabel}
              type="monotone"
              dataKey="withNextSoft"
              stroke="#84CC16"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#growthGradient)"
              dot={{ r: 4, fill: '#84CC16', stroke: '#0A2540', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#84CC16', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Milestone Roadmap Timeline below graph */}
      <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="flex items-center gap-1.5 text-xs text-[#84CC16] font-extrabold mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Month 1: Foundation
          </div>
          <div className="text-xs text-white font-bold">Digital Profiles &amp; Vault</div>
          <p className="text-[11px] text-blue-100/70 mt-0.5">Centralize staff records and contracts into unified audit-ready storage.</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="flex items-center gap-1.5 text-xs text-[#84CC16] font-extrabold mb-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Month 3: Payroll Automation
          </div>
          <div className="text-xs text-white font-bold">Statutory Tax &amp; Deductions</div>
          <p className="text-[11px] text-blue-100/70 mt-0.5">PAYE, NHF, and pensions calculate in 3 clicks with automated payslips.</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="flex items-center gap-1.5 text-xs text-[#84CC16] font-extrabold mb-1">
            <Layers className="w-3.5 h-3.5" /> Month 6: Operational Sync
          </div>
          <div className="text-xs text-white font-bold">Biometrics &amp; Geofencing</div>
          <p className="text-[11px] text-blue-100/70 mt-0.5">Turnstiles &amp; GPS clocking sync instantly with multi-branch rosters.</p>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
          <div className="flex items-center gap-1.5 text-xs text-[#84CC16] font-extrabold mb-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> Month 12: Pan-African Scale
          </div>
          <div className="text-xs text-white font-bold">AI Analytics &amp; Enterprise</div>
          <p className="text-[11px] text-blue-100/70 mt-0.5">Predictive workforce insights with zero ghost worker leakage.</p>
        </div>
      </div>
    </div>
  );
};
