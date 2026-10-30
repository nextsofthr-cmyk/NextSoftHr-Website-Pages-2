import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  SlidersHorizontal,
  Info,
  ChevronRight
} from 'lucide-react';
import { Job, ExperienceLevel } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface D3SalaryDistributionChartProps {
  job: Job;
  candidateExperienceLevel?: ExperienceLevel | string;
  parsedYearsOfExperience?: string;
  onApplyPreset?: (salary: string) => void;
}

// Experience multiplier & default salary baseline estimator
const EXPERIENCE_MULTIPLIERS: Record<string, { factor: number; label: string; expYears: string }> = {
  'Entry Level': { factor: 0.75, label: 'Entry Level', expYears: '0 - 2 years' },
  'Mid Level': { factor: 1.0, label: 'Mid Level', expYears: '3 - 5 years' },
  'Senior Level': { factor: 1.35, label: 'Senior Level', expYears: '6 - 8 years' },
  'Lead / Director': { factor: 1.75, label: 'Lead / Director', expYears: '8 - 12 years' },
  'Executive': { factor: 2.25, label: 'Executive / C-Suite', expYears: '12+ years' }
};

export const D3SalaryDistributionChart: React.FC<D3SalaryDistributionChartProps> = ({
  job,
  candidateExperienceLevel = 'Senior Level',
  parsedYearsOfExperience,
  onApplyPreset
}) => {
  const { currentCurrency, currencyConfig, convertAndFormatSalary } = useCurrency();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active Experience Level state
  const [selectedExpLevel, setSelectedExpLevel] = useState<string>(() => {
    if (candidateExperienceLevel && EXPERIENCE_MULTIPLIERS[candidateExperienceLevel]) {
      return candidateExperienceLevel;
    }
    return job.experienceLevel || 'Mid Level';
  });

  const [hoveredPoint, setHoveredPoint] = useState<{ salary: number; percentile: number; x: number; y: number } | null>(null);

  // Parse baseline numbers from job salaryRange (e.g. "₦1,800,000 - ₦2,500,000" or "$120,000 - $160,000")
  const baseSalaryNumbers = useMemo(() => {
    const raw = job.salaryRange || '1000000 - 2000000';
    const numbers = raw
      .replace(/[^0-9\-–]/g, ' ')
      .trim()
      .split(/[-–]+/)
      .map(s => parseInt(s.replace(/\s+/g, ''), 10))
      .filter(n => !isNaN(n) && n > 0);

    let min = numbers[0] || 1500000;
    let max = numbers[1] || min * 1.4;
    if (min > max) [min, max] = [max, min];

    const median = Math.round((min + max) / 2);
    return { min, max, median };
  }, [job.salaryRange]);

  // Adjust distribution based on selected experience level
  const distributionData = useMemo(() => {
    const expMeta = EXPERIENCE_MULTIPLIERS[selectedExpLevel] || { factor: 1.0 };
    const factor = expMeta.factor;

    const baseMed = baseSalaryNumbers.median;
    // Market center adjusted for experience
    const center = Math.round(baseMed * factor);
    const stdDev = Math.round(center * 0.22); // ~22% standard deviation

    const p10 = Math.round(center - 1.28 * stdDev);
    const p25 = Math.round(center - 0.675 * stdDev);
    const p50 = center;
    const p75 = Math.round(center + 0.675 * stdDev);
    const p90 = Math.round(center + 1.28 * stdDev);
    const minDomain = Math.max(10000, Math.round(center - 2.8 * stdDev));
    const maxDomain = Math.round(center + 2.8 * stdDev);

    return {
      center,
      stdDev,
      p10,
      p25,
      p50,
      p75,
      p90,
      minDomain,
      maxDomain
    };
  }, [baseSalaryNumbers, selectedExpLevel]);

  // Candidate benchmark relative position
  const candidateBenchmark = useMemo(() => {
    // Current job's median
    const jobMedian = baseSalaryNumbers.median;
    const marketMedian = distributionData.p50;
    const percentDiff = Math.round(((jobMedian - marketMedian) / marketMedian) * 100);

    let positionText = 'Market Competitive';
    if (percentDiff > 10) positionText = 'Above Market Average';
    else if (percentDiff < -10) positionText = 'Below Market Average';

    return {
      jobMedian,
      marketMedian,
      percentDiff,
      positionText
    };
  }, [baseSalaryNumbers, distributionData]);

  // Render D3 SVG
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current.clientWidth || 640;
    const height = 280;
    const margin = { top: 30, right: 30, bottom: 45, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Normal probability density function
    const normalPdf = (x: number, mean: number, sigma: number) => {
      const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(sigma, 2));
      return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
    };

    const xScale = d3.scaleLinear()
      .domain([distributionData.minDomain, distributionData.maxDomain])
      .range([0, innerWidth]);

    // Sample points for density line
    const stepCount = 120;
    const stepSize = (distributionData.maxDomain - distributionData.minDomain) / stepCount;
    const curvePoints: Array<{ x: number; y: number }> = [];

    for (let i = 0; i <= stepCount; i++) {
      const xVal = distributionData.minDomain + i * stepSize;
      const yVal = normalPdf(xVal, distributionData.center, distributionData.stdDev);
      curvePoints.push({ x: xVal, y: yVal });
    }

    const maxY = d3.max(curvePoints, d => d.y) || 0.001;
    const yScale = d3.scaleLinear()
      .domain([0, maxY * 1.15])
      .range([innerHeight, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define Gradients
    const defs = svg.append('defs');

    // Lime/Lemon Green to Deep Navy Gradient for bell curve area
    const areaGradient = defs.append('linearGradient')
      .attr('id', 'salaryAreaGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#84cc16') // lemon-green lime-500
      .attr('stop-opacity', 0.55);

    areaGradient.append('stop')
      .attr('offset', '80%')
      .attr('stop-color', '#2563EB') // royal blue
      .attr('stop-opacity', 0.15);

    areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#142B4A') // navy
      .attr('stop-opacity', 0.02);

    // IQR Middle 50% Gradient
    const iqrGradient = defs.append('linearGradient')
      .attr('id', 'iqrGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    iqrGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#bef264') // lime-300
      .attr('stop-opacity', 0.7);

    iqrGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#84cc16')
      .attr('stop-opacity', 0.2);

    // Full Distribution Area
    const fullArea = d3.area<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y0(innerHeight)
      .y1(d => yScale(d.y))
      .curve(d3.curveBasis);

    g.append('path')
      .datum(curvePoints)
      .attr('d', fullArea)
      .attr('fill', 'url(#salaryAreaGradient)');

    // Middle 50% Interquartile Range (p25 to p75)
    const iqrPoints = curvePoints.filter(d => d.x >= distributionData.p25 && d.x <= distributionData.p75);
    if (iqrPoints.length > 0) {
      // add boundary anchors
      const p25Y = normalPdf(distributionData.p25, distributionData.center, distributionData.stdDev);
      const p75Y = normalPdf(distributionData.p75, distributionData.center, distributionData.stdDev);
      const boundedIqr = [
        { x: distributionData.p25, y: p25Y },
        ...iqrPoints,
        { x: distributionData.p75, y: p75Y }
      ];

      g.append('path')
        .datum(boundedIqr)
        .attr('d', fullArea)
        .attr('fill', 'url(#iqrGradient)');
    }

    // Outline Curve Path
    const lineGenerator = d3.line<{ x: number; y: number }>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveBasis);

    g.append('path')
      .datum(curvePoints)
      .attr('fill', 'none')
      .attr('stroke', '#65a30d') // lime-600
      .attr('stroke-width', 2.5);

    // Percentile Marker lines (p25, Median p50, p75)
    const markers = [
      { xVal: distributionData.p25, label: '25th %ile', color: '#94a3b8', strokeDash: '3 3' },
      { xVal: distributionData.p50, label: 'Market Median', color: '#84cc16', strokeDash: 'none', isPrimary: true },
      { xVal: distributionData.p75, label: '75th %ile', color: '#94a3b8', strokeDash: '3 3' }
    ];

    markers.forEach(m => {
      const lineX = xScale(m.xVal);
      const topY = yScale(normalPdf(m.xVal, distributionData.center, distributionData.stdDev));

      g.append('line')
        .attr('x1', lineX)
        .attr('x2', lineX)
        .attr('y1', innerHeight)
        .attr('y2', topY)
        .attr('stroke', m.color)
        .attr('stroke-width', m.isPrimary ? 2 : 1)
        .attr('stroke-dasharray', m.strokeDash);

      // Marker top circle
      g.append('circle')
        .attr('cx', lineX)
        .attr('cy', topY)
        .attr('r', m.isPrimary ? 4.5 : 3)
        .attr('fill', m.color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5);
    });

    // Candidate Target Marker (Current Job Median)
    const jobMedX = xScale(baseSalaryNumbers.median);
    const jobMedY = yScale(normalPdf(baseSalaryNumbers.median, distributionData.center, distributionData.stdDev));

    // Vertical dashed marker for Job Offering
    g.append('line')
      .attr('x1', jobMedX)
      .attr('x2', jobMedX)
      .attr('y1', innerHeight)
      .attr('y2', Math.min(topMarginOffset(jobMedY), innerHeight - 20))
      .attr('stroke', '#2563EB')
      .attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '4 4');

    // Pin badge for Job Posting
    const pinG = g.append('g')
      .attr('transform', `translate(${jobMedX}, ${Math.max(10, jobMedY - 22)})`);

    pinG.append('rect')
      .attr('x', -45)
      .attr('y', -14)
      .attr('width', 90)
      .attr('height', 20)
      .attr('rx', 10)
      .attr('fill', '#142B4A')
      .attr('stroke', '#60A5FA')
      .attr('stroke-width', 1.5);

    pinG.append('text')
      .attr('text-anchor', 'middle')
      .attr('y', 0)
      .attr('fill', '#ffffff')
      .attr('font-size', '9px')
      .attr('font-weight', '700')
      .text('Job Offering');

    function topMarginOffset(y: number) {
      return Math.max(0, y);
    }

    // X Axis
    const formatCurrencyShort = (d: d3.NumberValue) => {
      const val = Number(d);
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${Math.round(val / 1000)}k`;
      return String(val);
    };

    const xAxis = d3.axisBottom(xScale)
      .ticks(6)
      .tickFormat(formatCurrencyShort);

    const gx = g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    gx.selectAll('text')
      .attr('font-size', '10px')
      .attr('fill', '#64748b');

    gx.select('.domain')
      .attr('stroke', '#cbd5e1');

    gx.selectAll('.tick line')
      .attr('stroke', '#e2e8f0');

    // Interactive Hover Overlay
    const bisectSalary = d3.bisector((d: { x: number }) => d.x).left;

    const overlay = g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('cursor', 'crosshair');

    overlay.on('mousemove', function (event: MouseEvent) {
      const [mouseX] = d3.pointer(event, this);
      const hoveredSalary = xScale.invert(mouseX);
      const index = bisectSalary(curvePoints, hoveredSalary);
      const p = curvePoints[index] || curvePoints[0];

      // Approximate Cumulative Normal Distribution for percentile
      const z = (p.x - distributionData.center) / distributionData.stdDev;
      const approxCdf = 1 / (1 + Math.exp(-0.07056 * Math.pow(z, 3) - 1.5976 * z));
      const percentile = Math.min(99, Math.max(1, Math.round(approxCdf * 100)));

      setHoveredPoint({
        salary: Math.round(p.x),
        percentile,
        x: mouseX + margin.left,
        y: yScale(p.y) + margin.top
      });
    });

    overlay.on('mouseleave', () => {
      setHoveredPoint(null);
    });

  }, [distributionData, baseSalaryNumbers, job]);

  return (
    <div className="space-y-4">
      {/* Experience Level Switcher */}
      <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
            <span>Benchmark by Experience Tier:</span>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {parsedYearsOfExperience ? `Extracted profile tenure: ${parsedYearsOfExperience}` : 'Select your tier to adjust market percentiles'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {Object.entries(EXPERIENCE_MULTIPLIERS).map(([tierKey, meta]) => {
            const isSelected = selectedExpLevel === tierKey;
            return (
              <button
                key={tierKey}
                type="button"
                onClick={() => setSelectedExpLevel(tierKey)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-lime-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
                title={`${meta.label} (${meta.expYears})`}
              >
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* D3 Distribution Container */}
      <div 
        ref={containerRef} 
        className="relative bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-lime-500" />
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              D3 Gaussian Salary Distribution Curve ({job.title})
            </h4>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-lime-400 opacity-70" />
              <span>IQR (25th - 75th %ile)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 bg-[#2563EB]" />
              <span>Job Offering</span>
            </span>
          </div>
        </div>

        {/* The D3 SVG Element */}
        <div className="w-full relative">
          <svg ref={svgRef} className="w-full select-none" />

          {/* Interactive D3 Hover Tooltip */}
          {hoveredPoint && (
            <div 
              className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 bg-[#142B4A] dark:bg-black text-white px-3 py-1.5 rounded-xl shadow-xl border border-lime-400/50 text-xs text-center"
              style={{ left: hoveredPoint.x, top: hoveredPoint.y }}
            >
              <div className="text-[10px] text-lime-400 font-bold uppercase tracking-wider">
                {hoveredPoint.percentile}th Percentile
              </div>
              <div className="text-sm font-extrabold text-white">
                {convertAndFormatSalary(String(hoveredPoint.salary), job.currency)}
              </div>
            </div>
          )}
        </div>

        <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-2">
          Hover over the distribution curve to inspect exact percentile salary thresholds for {job.category} in this geography.
        </p>
      </div>

      {/* Percentiles Grid Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">25th Percentile</span>
          <span className="text-sm font-extrabold text-[#142B4A] dark:text-white tabular-nums">
            {convertAndFormatSalary(String(distributionData.p25), job.currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Entry/Conservative</span>
        </div>

        <div className="p-3 rounded-xl bg-lime-50 dark:bg-lime-950/60 border border-lime-200 dark:border-lime-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-lime-800 dark:text-lime-300 block mb-0.5">Market Median (50th)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
          </div>
          <span className="text-sm font-extrabold text-lime-950 dark:text-lime-200 tabular-nums">
            {convertAndFormatSalary(String(distributionData.p50), job.currency)}
          </span>
          <span className="text-[10px] text-lime-700 dark:text-lime-400 block mt-0.5">Standard Midpoint</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">75th Percentile</span>
          <span className="text-sm font-extrabold text-[#142B4A] dark:text-white tabular-nums">
            {convertAndFormatSalary(String(distributionData.p75), job.currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">High Performance</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">90th Percentile</span>
          <span className="text-sm font-extrabold text-[#142B4A] dark:text-white tabular-nums">
            {convertAndFormatSalary(String(distributionData.p90), job.currency)}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">Top Tier / Retained</span>
        </div>
      </div>

      {/* Candidate Benchmark Position Analysis */}
      <div className="p-3.5 bg-gradient-to-r from-blue-50/70 to-lime-50/70 dark:from-slate-900 dark:to-slate-900 rounded-2xl border border-blue-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#142B4A] dark:text-white">
              Candidate Benchmark Leverage:
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lime-100 dark:bg-lime-950/80 text-lime-900 dark:text-lime-300 border border-lime-300 dark:border-lime-800">
              {candidateBenchmark.positionText}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            The offered midpoint of <strong>{convertAndFormatSalary(String(candidateBenchmark.jobMedian), job.currency)}</strong> is{' '}
            <strong className={candidateBenchmark.percentDiff >= 0 ? 'text-lime-700 dark:text-lime-400' : 'text-amber-600 dark:text-amber-400'}>
              {Math.abs(candidateBenchmark.percentDiff)}% {candidateBenchmark.percentDiff >= 0 ? 'higher than' : 'below'}
            </strong>{' '}
            the regional median for {selectedExpLevel} practitioners in {job.industry}.
          </p>
        </div>

        {onApplyPreset && (
          <button
            type="button"
            onClick={() => onApplyPreset(convertAndFormatSalary(String(distributionData.p75), job.currency))}
            className="px-3.5 py-2 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Target 75th %ile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
