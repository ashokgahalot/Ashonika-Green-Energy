/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DollarSign, Landmark, Zap, ShieldAlert, Sparkles, Scale, Info, Layers } from 'lucide-react';

type ConsumerType = 'residential' | 'commercial' | 'industrial';

export default function SolarCalculator() {
  const [consumerType, setConsumerType] = useState<ConsumerType>('residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(8000); // in Rupees (INR) as default
  const [useBattery, setUseBattery] = useState<boolean>(false);
  const [customRange, setCustomRange] = useState<number>(0); // manual scale offset if any

  // Calculated state
  const [systemSize, setSystemSize] = useState<number>(3); // kW
  const [estimatedCost, setEstimatedCost] = useState<number>(180000); // INR
  const [monthlySavings, setMonthlySavings] = useState<number>(7200); // INR
  const [paybackPeriod, setPaybackPeriod] = useState<number>(4.2); // Years
  const [panelsCount, setPanelsCount] = useState<number>(8); // panels count
  const [co2Saved, setCo2Saved] = useState<number>(3.6); // Tons per year
  const [treesSaved, setTreesSaved] = useState<number>(160); // Trees count

  useEffect(() => {
    // Basic rules to find recommended system size in kW based on monthly electricity bill in INR
    // Standard tariff: ~7.5 Rs/unit for residential, ~9 Rs/unit for commercial, ~11 Rs/unit for industrial
    let unitCost = 8.0;
    let panelsEfficiency = 440; // 440W solar panel
    let costPerKW = 60000; // Rs per kW for standard installations without batteries

    if (consumerType === 'commercial') {
      unitCost = 9.5;
      costPerKW = 52000;
    } else if (consumerType === 'industrial') {
      unitCost = 11.0;
      costPerKW = 46000;
    }

    const unitsConsumed = monthlyBill / unitCost;
    // 1kW solar panel generates ~4 units per day = ~120 units per month
    let calculatedKW = Math.ceil((unitsConsumed / 120) * 10) / 10;
    if (calculatedKW < 1) calculatedKW = 1;

    // Apply slider factor if customRange slider overrides default estimation
    if (customRange > 0) {
      calculatedKW = customRange;
    }

    // System capacity calculation details
    const finalKW = calculatedKW;
    setSystemSize(finalKW);

    // Panel calculation: kW * 1000W / panelsEfficiency
    const reqPanelsCount = Math.ceil((finalKW * 1000) / panelsEfficiency);
    setPanelsCount(reqPanelsCount);

    // Calculate estimated capital cost
    let baseInstallCost = finalKW * costPerKW;
    if (useBattery) {
      // Add battery cost: Rs 25,000 per kW capacity multiplier
      baseInstallCost += finalKW * 28000;
    }
    // Subsidy assistance reduction (20% for residential only)
    if (consumerType === 'residential') {
      const subsidy = baseInstallCost * 0.18;
      baseInstallCost = baseInstallCost - subsidy;
    }
    setEstimatedCost(Math.round(baseInstallCost));

    // Calculate monthly savings
    // A 1kW system saves ~120 units * unitCost per month
    let savingsFactor = 0.95; // 95% bill reduction maximum
    const generatedUnits = finalKW * 120;
    let calculatedMonthlySavings = Math.min(monthlyBill * savingsFactor, generatedUnits * unitCost);
    setMonthlySavings(Math.round(calculatedMonthlySavings));

    // Calculate payback period: Investment / (Monthly savings * 12)
    const annualSavings = calculatedMonthlySavings * 12;
    const yearsToPayback = baseInstallCost / annualSavings;
    setPaybackPeriod(Math.round(yearsToPayback * 10) / 10);

    // CO2 and Trees calculations: 1kW solar = 1.2 Tons CO2 offset/year = ~55 trees saved per year
    const co2Reduction = finalKW * 1.2;
    setCo2Saved(Math.round(co2Reduction * 10) / 10);
    setTreesSaved(Math.round(finalKW * 55));

  }, [consumerType, monthlyBill, useBattery, customRange]);

  // Adjust defaults when consumer type switches to prevent awkward values
  const handleConsumerTypeChange = (type: ConsumerType) => {
    setConsumerType(type);
    setCustomRange(0); // reset custom slider
    if (type === 'residential') {
      setMonthlyBill(8000);
    } else if (type === 'commercial') {
      setMonthlyBill(45000);
    } else if (type === 'industrial') {
      setMonthlyBill(280000);
    }
  };

  // Generate coordinate points for 25-Year savings growth graph
  const generateGraphPoints = () => {
    const years = [0, 5, 10, 15, 20, 25];
    const width = 500;
    const height = 180;
    const padding = 15;

    // Calculate path for Investment line (Horizontal, flat)
    // Map cost to y: 0 is bottom, height is top.
    const maxVal = (monthlySavings * 12 * 25) * 1.1; // Max savings scaled

    // Solar Earnings points mapped to canvas coordinates
    const earningsPoints = years.map((year, idx) => {
      // compound electricity tariff inflation ~4% annually
      const accumulatedSavings = Array.from({ length: year }).reduce<number>((acc, _, currentYear) => {
        return acc + (monthlySavings * 12 * Math.pow(1.04, currentYear));
      }, 0);

      const px = padding + (idx / (years.length - 1)) * (width - padding * 2);
      const py = height - padding - (accumulatedSavings / maxVal) * (height - padding * 2 || 1);
      return { x: px, y: py, val: Math.round(accumulatedSavings) };
    });

    const netInvestment = estimatedCost;
    const investmentPoints = years.map((year, idx) => {
      const px = padding + (idx / (years.length - 1)) * (width - padding * 2);
      const py = height - padding - (netInvestment / maxVal) * (height - padding * 2 || 1);
      return { x: px, y: py };
    });

    // SVG Polyline paths
    const earningsPath = earningsPoints.map(p => `${p.x},${p.y}`).join(' ');
    const investmentPath = investmentPoints.map(p => `${p.x},${p.y}`).join(' ');

    return { earningsPath, investmentPath, points: earningsPoints, maxVal };
  };

  const { earningsPath, investmentPath, points, maxVal } = generateGraphPoints();

  return (
    <section id="calculator" className="relative py-28 bg-[#071B2F] overflow-hidden border-b border-white/5">

      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-[#FFC107]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading Group */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold tracking-widest text-[#FFC107] uppercase">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            ROI Feasibility Simulator
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Calculate Your <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Solar Savings</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Configure your monthly utility bills to view recommended physical system scale, capital cost estimations, and 25-Year lifetime gains.
          </p>
        </div>

        {/* Calculator Main Panel Glass deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl space-y-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4 block">
                1. System Configuration
              </span>

              {/* Consumer Type selector */}
              <div className="grid grid-cols-3 gap-2 bg-[#071626] p-1.5 rounded-2xl border border-white/5 mb-6">
                {(['residential', 'commercial', 'industrial'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleConsumerTypeChange(type)}
                    className={`py-2 text-[10px] md:text-xs font-bold tracking-wider uppercase rounded-xl transition-all ${
                      consumerType === type
                        ? 'bg-emerald-600 text-white shadow-md font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Monthly Bill Input */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <label htmlFor="monthly-bill-range" className="text-xs md:text-sm font-semibold text-gray-300">
                    Monthly Electricity Bill
                  </label>
                  <span className="text-sm md:text-base font-extrabold text-[#FFC107] font-mono">
                    ₹{monthlyBill.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  id="monthly-bill-range"
                  type="range"
                  min={consumerType === 'residential' ? 1500 : consumerType === 'commercial' ? 10000 : 80000}
                  max={consumerType === 'residential' ? 40000 : consumerType === 'commercial' ? 150000 : 1500000}
                  step={consumerType === 'residential' ? 500 : consumerType === 'commercial' ? 2000 : 10000}
                  value={monthlyBill}
                  onChange={(e) => {
                    setMonthlyBill(Number(e.target.value));
                    setCustomRange(0); // auto re-estimate size
                  }}
                  className="w-full h-1.5 bg-[#071626] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>min</span>
                  <span>max</span>
                </div>
              </div>

              {/* System Size Adjuster Override Slider */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <label htmlFor="system-size-override" className="text-xs md:text-sm font-semibold text-gray-300 flex items-center gap-1">
                    Override System Capacity
                    <Info className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer" title="Directly change the PV array size in KW" />
                  </label>
                  <span className="text-sm font-extrabold text-[#4ADE80] font-mono">
                    {systemSize} kWp
                  </span>
                </div>
                <input
                  id="system-size-override"
                  type="range"
                  min="1"
                  max={consumerType === 'residential' ? 20 : consumerType === 'commercial' ? 80 : 350}
                  step="0.5"
                  value={systemSize}
                  onChange={(e) => setCustomRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#071626] rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-emerald-600 font-mono">
                  <span>1 kWp</span>
                  <span>{consumerType === 'residential' ? '20 kWp' : consumerType === 'commercial' ? '80 kWp' : '350 kWp'}</span>
                </div>
              </div>

              {/* Hybrid Battery Backup integration toggle */}
              <div className="flex items-center justify-between p-4 bg-[#071626] rounded-2xl border border-white/5">
                <div className="space-y-0.5">
                  <label htmlFor="battery-integration" className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Battery Storage
                  </label>
                  <p className="text-[10px] text-gray-500">
                    Add solid-state lithium emergency backing.
                  </p>
                </div>
                <input
                  id="battery-integration"
                  type="checkbox"
                  checked={useBattery}
                  onChange={(e) => setUseBattery(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 rounded-md cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#FFC107] bg-white/5 py-3 px-4 rounded-xl border border-white/5">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>
                  {consumerType === 'residential' 
                    ? 'Includes estimated 18% Central PM-Surya Ghar subsidy deduction.' 
                    : 'Qualifies for 40% Accelerated Depreciation tax benefit.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Output Summary & Animated Financial Chart */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Immediate calculated specs cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-[#09223c] border border-white/5 relative overflow-hidden group">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  System Layout
                </span>
                <span className="text-lg md:text-xl font-extrabold text-white font-mono block">
                  {panelsCount} Panels
                </span>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  ~{Math.round(systemSize * 82)} sq.ft space req.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#09223c] border border-white/5 relative overflow-hidden group">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Est. Net Setup Cost
                </span>
                <span className="text-lg md:text-xl font-extrabold text-emerald-400 font-mono block">
                  ₹{estimatedCost.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Turn-key investment cost
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#09223c] border border-white/5 relative overflow-hidden group col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Estimated Payback
                </span>
                <span className="text-lg md:text-xl font-extrabold text-[#FFC107] font-mono block">
                  {paybackPeriod} Years
                </span>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Breakeven investment threshold
                </span>
              </div>

            </div>

            {/* Savings & Environment Benefits Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-emerald-900/10 border border-emerald-500/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Estimated Bill Savings
                  </span>
                  <span className="text-xl md:text-2xl font-extrabold text-white font-mono mt-1 block">
                    ₹{monthlySavings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-gray-400">Monthly utility savings</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/5 to-[#09223c] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-wider block">
                    Ecosystem Impact
                  </span>
                  <span className="text-xl md:text-2xl font-extrabold text-white font-mono mt-1 block">
                    {co2Saved} Tons
                  </span>
                  <span className="text-[10px] text-gray-400">CO₂ offset yearly (impl. {treesSaved} trees)</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#FFC107]" />
                </div>
              </div>

            </div>

            {/* Futuristic 25-Year Financial Return Graph */}
            <div className="p-6 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    25-Year Cumulative Savings Curve
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Investment vs Compound Earnings (accounting solar solar degradation & compounding tariffs)
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/5 py-1 px-2.5 rounded-full border border-emerald-500/10 font-mono">
                  Lifetime Gains: ₹{points[points.length - 1].val.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Custom SVG Line Graph Renderer - Lightweight, robust, fully responsive */}
              <div className="relative w-full overflow-hidden">
                <svg
                  viewBox="0 0 500 180"
                  className="w-full h-auto block overflow-visible select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="chartGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0B8F4D" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Guideline indicators */}
                  <line x1="15" y1="45" x2="485" y2="45" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                  <line x1="15" y1="90" x2="485" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                  <line x1="15" y1="135" x2="485" y2="135" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

                  {/* Shaded Area fill under the curve */}
                  {points.length > 0 && (
                    <path
                      d={`M ${points[0].x},165 L ${earningsPath} L ${points[points.length - 1].x},165 Z`}
                      fill="url(#chartGlow)"
                    />
                  )}

                  {/* The Net Investment Line (Horizontal Indicator) */}
                  <polyline
                    fill="none"
                    stroke="#FFC107"
                    strokeWidth="1.5"
                    strokeDasharray="5, 5"
                    points={investmentPath}
                  />

                  {/* The Solar Earnings Curve Line */}
                  <polyline
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    points={earningsPath}
                  />

                  {/* Graphic coordinate vertex points */}
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="#4ADE80"
                        stroke="#071B2F"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-all hover:scale-150"
                      />
                      {/* Year marker axis text */}
                      <text
                        x={p.x}
                        y="178"
                        fill="rgba(156, 163, 175, 0.7)"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        Yr {idx * 5}
                      </text>
                      {/* Vertical projection tooltip bubble */}
                      <text
                        x={p.x}
                        y={p.y - 10}
                        fill="rgba(255, 255, 255, 0.95)"
                        fontSize="7"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontWeight="bold"
                        className="opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                      >
                        ₹{(p.val / 100000).toFixed(1)}L
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Chart Legend Labels */}
              <div className="flex justify-center items-center gap-6 pt-2 text-[10px] md:text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-[3px] bg-[#4ADE80]" />
                  <span className="text-gray-300 font-semibold">Cumulative Net Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-[3px] border-b-2 border-dashed border-[#FFC107]" />
                  <span className="text-gray-300 font-semibold">Initial Net Investment</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
