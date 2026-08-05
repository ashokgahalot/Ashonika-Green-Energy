/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import {
  Sun,
  Zap,
  TrendingUp,
  Leaf,
  PiggyBank,
  MapPin,
  User,
  Calculator,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Home,
  CheckCircle2,
  TreePine
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

// Interactive Animated Counter Component for premium look
const AnimatedCounter = ({ value, duration = 1.2, formatter = (v: number) => v.toString() }: { value: number; duration?: number; formatter?: (v: number) => string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const intervalTime = 25;
    const totalSteps = totalMiliseconds / intervalTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.round(start * 100) / 100);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{formatter(count)}</span>;
};

// Precise regional data for 36 Indian States and Union Territories
interface StateData {
  nameEn: string;
  nameHi: string;
  dailyFactor: number; // kWh generated per kW of solar system daily
  defaultTariff: number; // Tariff in ₹ per kWh
}

const INDIAN_STATES: StateData[] = [
  { nameEn: "Andhra Pradesh", nameHi: "आंध्र प्रदेश", dailyFactor: 4.2, defaultTariff: 7.50 },
  { nameEn: "Arunachal Pradesh", nameHi: "अरुणाचल प्रदेश", dailyFactor: 3.6, defaultTariff: 6.00 },
  { nameEn: "Assam", nameHi: "असम", dailyFactor: 3.8, defaultTariff: 7.00 },
  { nameEn: "Bihar", nameHi: "बिहार", dailyFactor: 3.9, defaultTariff: 7.50 },
  { nameEn: "Chhattisgarh", nameHi: "छत्तीसगढ़", dailyFactor: 4.2, defaultTariff: 6.80 },
  { nameEn: "Goa", nameHi: "गोवा", dailyFactor: 4.1, defaultTariff: 6.50 },
  { nameEn: "Gujarat", nameHi: "गुजरात", dailyFactor: 4.5, defaultTariff: 7.00 },
  { nameEn: "Haryana", nameHi: "हरियाणा", dailyFactor: 4.0, defaultTariff: 7.20 },
  { nameEn: "Himachal Pradesh", nameHi: "हिमाचल प्रदेश", dailyFactor: 3.8, defaultTariff: 5.50 },
  { nameEn: "Jharkhand", nameHi: "झारखंड", dailyFactor: 4.0, defaultTariff: 6.80 },
  { nameEn: "Karnataka", nameHi: "कर्नाटक", dailyFactor: 4.3, defaultTariff: 8.00 },
  { nameEn: "Kerala", nameHi: "केरल", dailyFactor: 4.0, defaultTariff: 7.80 },
  { nameEn: "Madhya Pradesh", nameHi: "मध्य प्रदेश", dailyFactor: 4.3, defaultTariff: 7.50 },
  { nameEn: "Maharashtra", nameHi: "महाराष्ट्र", dailyFactor: 4.2, defaultTariff: 9.50 },
  { nameEn: "Manipur", nameHi: "मणिपुर", dailyFactor: 3.7, defaultTariff: 6.20 },
  { nameEn: "Meghalaya", nameHi: "मेघालय", dailyFactor: 3.6, defaultTariff: 6.00 },
  { nameEn: "Mizoram", nameHi: "मिजोरम", dailyFactor: 3.7, defaultTariff: 6.00 },
  { nameEn: "Nagaland", nameHi: "नागालैंड", dailyFactor: 3.6, defaultTariff: 6.50 },
  { nameEn: "Odisha", nameHi: "ओडिशा", dailyFactor: 4.0, defaultTariff: 6.50 },
  { nameEn: "Punjab", nameHi: "पंजाब", dailyFactor: 4.1, defaultTariff: 7.20 },
  { nameEn: "Rajasthan", nameHi: "राजस्थान", dailyFactor: 4.5, defaultTariff: 8.00 },
  { nameEn: "Sikkim", nameHi: "सिक्किम", dailyFactor: 3.5, defaultTariff: 5.20 },
  { nameEn: "Tamil Nadu", nameHi: "तमिलनाडु", dailyFactor: 4.3, defaultTariff: 8.20 },
  { nameEn: "Telangana", nameHi: "तेलंगाना", dailyFactor: 4.3, defaultTariff: 8.00 },
  { nameEn: "Tripura", nameHi: "त्रिपुरा", dailyFactor: 3.7, defaultTariff: 6.20 },
  { nameEn: "Uttar Pradesh", nameHi: "उत्तर प्रदेश", dailyFactor: 4.0, defaultTariff: 7.50 },
  { nameEn: "Uttarakhand", nameHi: "उत्तराखंड", dailyFactor: 3.9, defaultTariff: 6.00 },
  { nameEn: "West Bengal", nameHi: "पश्चिम बंगाल", dailyFactor: 3.9, defaultTariff: 7.80 },
  { nameEn: "Andaman and Nicobar Islands", nameHi: "अंडमान और निकोबार द्वीप समूह", dailyFactor: 4.0, defaultTariff: 8.00 },
  { nameEn: "Chandigarh", nameHi: "चंडीगढ़", dailyFactor: 4.1, defaultTariff: 6.50 },
  { nameEn: "Dadra and Nagar Haveli and Daman and Diu", nameHi: "दादरा और नगर हवेली और दमन और दीव", dailyFactor: 4.3, defaultTariff: 6.00 },
  { nameEn: "Delhi", nameHi: "दिल्ली", dailyFactor: 4.1, defaultTariff: 8.00 },
  { nameEn: "Jammu and Kashmir", nameHi: "जम्मू और कश्मीर", dailyFactor: 3.8, defaultTariff: 5.50 },
  { nameEn: "Ladakh", nameHi: "लद्दाख", dailyFactor: 4.2, defaultTariff: 5.50 },
  { nameEn: "Lakshadweep", nameHi: "लक्षद्वीप", dailyFactor: 4.2, defaultTariff: 8.00 },
  { nameEn: "Puducherry", nameHi: "पुडुचेरी", dailyFactor: 4.3, defaultTariff: 6.80 }
];

export default function SolarCalculator() {
  const { language } = useLanguage();
  
  // Input fields state
  const [inputType, setInputType] = useState<'bill' | 'consumption'>('bill');
  const [inputValue, setInputValue] = useState<string>('2500');
  const [selectedStateIndex, setSelectedStateIndex] = useState<number>(20); // Default to Rajasthan
  const [customerCategory, setCustomerCategory] = useState<'residential' | 'commercial' | 'industrial'>('residential');
  const [tariffRate, setTariffRate] = useState<string>('8.00');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showPdfConfirm, setShowPdfConfirm] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Results State
  const [results, setResults] = useState({
    plantSize: 0,
    monthlyGen: 0,
    annualGen: 0,
    lifetimeGen: 0,
    monthlySavings: 0,
    annualSavings: 0,
    lifetimeSavings: 0,
    co2Reduced: 0,
    treesPlanted: 0,
    areaRequired: 0,
    investmentEstimate: { min: 0, max: 0 },
    paybackPeriod: 0,
    roi: 0
  });

  const resultsRef = useRef<HTMLDivElement>(null);

  // Handle auto tariff updating on state or category change
  useEffect(() => {
    const stateData = INDIAN_STATES[selectedStateIndex];
    let baseTariff = stateData.defaultTariff;
    
    // Apply typical category modifiers
    if (customerCategory === 'commercial') {
      baseTariff = Math.round(baseTariff * 1.25 * 100) / 100;
    } else if (customerCategory === 'industrial') {
      baseTariff = Math.round(baseTariff * 1.15 * 100) / 100;
    }
    
    setTariffRate(baseTariff.toFixed(2));
  }, [selectedStateIndex, customerCategory]);

  // Loading phase steps simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCalculating) {
      const stepsCount = 4;
      const stepDuration = 500; // 500ms per text step

      const runSteps = (currentStep: number) => {
        if (currentStep < stepsCount) {
          setLoadingStep(currentStep);
          timer = setTimeout(() => runSteps(currentStep + 1), stepDuration);
        } else {
          // Finish calculation
          setIsCalculating(false);
          setShowResults(true);
          
          // Scroll smoothly to results
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      };

      runSteps(0);
    }
    return () => clearTimeout(timer);
  }, [isCalculating]);

  // Calculate values
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const valueNum = parseFloat(inputValue) || 0;
    if (valueNum <= 0) return;

    const tariffNum = parseFloat(tariffRate) || 7.0;
    const stateData = INDIAN_STATES[selectedStateIndex];
    const dailyFactor = stateData.dailyFactor;

    // 1. Calculate Monthly Electricity Consumption in Units (kWh)
    let monthlyConsumption = 0;
    if (inputType === 'bill') {
      monthlyConsumption = valueNum / tariffNum;
    } else {
      monthlyConsumption = valueNum;
    }

    // 2. Recommended Solar Plant Size (kW)
    // 1 kW solar plant generates: dailyFactor * 30 kWh per month
    const monthlyGenPerkW = dailyFactor * 30;
    let plantSize = monthlyConsumption / monthlyGenPerkW;
    
    // Round to nearest 0.1 kW for high-precision
    plantSize = Math.round(plantSize * 10) / 10;
    if (plantSize < 1) plantSize = 1.0; // minimum recommended system

    // 3. Generation stats
    const monthlyGen = plantSize * dailyFactor * 30;
    const annualGen = monthlyGen * 12;
    const lifetimeGen = annualGen * 25; // 25 year solar life standard

    // 4. Financial savings stats
    const monthlySavings = monthlyGen * tariffNum;
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25;

    // 5. Environmental Benefits
    // 0.82 kg CO2 reduction per kWh generated
    const co2Reduced = (lifetimeGen * 0.82) / 1000; // in Tonnes
    // 1 Tree absorbs roughly 20kg of CO2 per year, so over 25 years a tree absorbs 500kg (0.5 Tonnes)
    const treesPlanted = Math.round((lifetimeGen * 0.82) / 20); // lifetime trees equivalent absorption

    // 6. Area required in square feet (average 80-100 sq ft per kW)
    const areaRequired = Math.round(plantSize * 85);

    // 7. Standard Indian Benchmark Solar Investment Cost Estimates (pre-subsidy)
    // For residential: Rs. 45000/- per kW
    // For Commercial: Rs. 25500/- per kW
    // For Industrial: Rs. 25500/- per kW
    let baseCostPerkW = 45000;
    if (customerCategory === 'commercial' || customerCategory === 'industrial') {
      baseCostPerkW = 25500;
    }

    const investmentMin = Math.round(plantSize * baseCostPerkW);
    const investmentMax = Math.round(plantSize * baseCostPerkW);

    const averageInvestment = Math.round((investmentMin + investmentMax) / 2);
    const paybackPeriod = annualSavings > 0 ? Math.round((averageInvestment / annualSavings) * 10) / 10 : 0;
    const roi = averageInvestment > 0 ? Math.round(((annualSavings / averageInvestment) * 100) * 10) / 10 : 0;

    setResults({
      plantSize,
      monthlyGen: Math.round(monthlyGen),
      annualGen: Math.round(annualGen),
      lifetimeGen: Math.round(lifetimeGen),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      lifetimeSavings: Math.round(lifetimeSavings),
      co2Reduced: Math.round(co2Reduced * 10) / 10,
      treesPlanted,
      areaRequired,
      investmentEstimate: { min: investmentMin, max: investmentMax },
      paybackPeriod,
      roi
    });

    setIsCalculating(true);

    // Trigger Google Analytics 4 (GA4) key event
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'calculator_form_submit', {
        input_type: inputType,
        input_value: valueNum,
        customer_category: customerCategory,
        plant_size: plantSize
      });
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setInputValue(inputType === 'bill' ? '2500' : '300');
  };

  const handleInstagramShare = () => {
    const stateName = language === 'hi' ? INDIAN_STATES[selectedStateIndex].nameHi : INDIAN_STATES[selectedStateIndex].nameEn;
    const categoryName = customerCategory === 'residential' 
      ? (language === 'hi' ? 'घरेलू (Residential)' : 'Residential')
      : customerCategory === 'commercial' 
        ? (language === 'hi' ? 'व्यावसायिक (Commercial)' : 'Commercial')
        : (language === 'hi' ? 'औद्योगिक (Industrial)' : 'Industrial');
    const inputValStr = inputType === 'bill' 
      ? `Rs. ${parseFloat(inputValue).toLocaleString()}/month` 
      : `${parseFloat(inputValue).toLocaleString()} Units/month`;

    const msg = 
      `☀️ ASHONIKA GREEN ENERGY SOLAR REPORT 🌿\n\n` +
      `⚡ Join the green revolution & slash your electricity bills! Here is my custom solar estimate:\n\n` +
      `📊 INPUT PARAMETERS:\n` +
      `• State/UT: ${stateName}\n` +
      `• Category: ${categoryName}\n` +
      `• Monthly Consumption: ${inputValStr}\n` +
      `• Grid Tariff Rate: Rs. ${tariffRate}/kWh\n\n` +
      `📐 RECOMMENDED SYSTEM DESIGN:\n` +
      `• Solar Capacity: ${results.plantSize.toFixed(1)} kW\n` +
      `• Rooftop Area: ${results.areaRequired.toLocaleString()} sq.ft.\n` +
      `• Estimated Investment: Rs. ${Math.round((results.investmentEstimate.min + results.investmentEstimate.max) / 2).toLocaleString()}\n\n` +
      `💡 ENERGY GENERATION ESTIMATES:\n` +
      `• Monthly Generation: ${results.monthlyGen.toLocaleString()} kWh/Units\n` +
      `• Annual Generation: ${results.annualGen.toLocaleString()} kWh/Units\n` +
      `• Lifetime Generation (25 Yrs): ${results.lifetimeGen.toLocaleString()} kWh/Units\n\n` +
      `💰 FINANCIAL SAVINGS & RETURN:\n` +
      `• Monthly Bill Savings: Rs. ${results.monthlySavings.toLocaleString()}\n` +
      `• Annual Energy Savings: Rs. ${results.annualSavings.toLocaleString()}\n` +
      `• Lifetime Cumulative Savings: Rs. ${results.lifetimeSavings.toLocaleString()}\n` +
      `• Simple Payback Period: ${results.paybackPeriod.toFixed(1)} Years\n` +
      `• Annual ROI: ${results.roi.toFixed(1)}%\n\n` +
      `🌱 ENVIRONMENTAL REDUCTION IMPACT:\n` +
      `• CO2 Emissions Avoided: ${results.co2Reduced.toFixed(1)} Tonnes\n` +
      `• Equivalent Trees Planted: ${results.treesPlanted.toLocaleString()} Trees\n\n` +
      `🔗 Calculate your custom solar savings blueprint at:\n` +
      `https://greenenergy.ashonika.com/`;

    // Attempt native share API if supported (excellent on mobile where Instagram resides)
    if (navigator.share) {
      navigator.share({
        title: 'Ashonika Green Energy Solar Report',
        text: msg,
        url: 'https://greenenergy.ashonika.com/'
      })
      .then(() => console.log('Successfully shared via native API'))
      .catch((error) => {
        console.error('Error sharing via native API:', error);
        fallbackInstagramShare(msg);
      });
    } else {
      fallbackInstagramShare(msg);
    }
  };

  const fallbackInstagramShare = (msg: string) => {
    navigator.clipboard.writeText(msg).then(() => {
      setShowShareToast(true);
      // Redirect directly to Instagram Direct Messages inbox/new chat
      window.open('https://www.instagram.com/direct/inbox/', '_blank');
      setTimeout(() => {
        setShowShareToast(false);
      }, 5000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleGeneratePDF = async () => {
    setShowPdfConfirm(false);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const stateName = language === 'hi' ? INDIAN_STATES[selectedStateIndex].nameHi : INDIAN_STATES[selectedStateIndex].nameEn;
    const categoryName = customerCategory === 'residential' 
      ? (language === 'hi' ? 'घरेलू' : 'Residential')
      : customerCategory === 'commercial' 
        ? (language === 'hi' ? 'व्यावसायिक' : 'Commercial')
        : (language === 'hi' ? 'औद्योगिक' : 'Industrial');

    const averageInvestment = Math.round((results.investmentEstimate.min + results.investmentEstimate.max) / 2);

    // Color theme
    const primaryColor = [5, 150, 105]; // Emerald: #059669
    const secondaryColor = [245, 158, 11]; // Gold/Amber: #F59E0B
    const darkColor = [15, 23, 42]; // Slate 900: #0F172A
    const grayColor = [100, 116, 139]; // Slate 500: #64748B
    const bgLightColor = [248, 250, 252]; // Slate 50: #F8FAFC

    // Draw header border accent
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 8, 'F');

    // Try to load logo image
    const logoUrl = "https://lh3.googleusercontent.com/d/1XT4C5ZM-aRBphGpdSCVpBj5BlPs9i_K8";
    let logoImg: HTMLImageElement | null = null;
    try {
      logoImg = await new Promise<HTMLImageElement | null>((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = logoUrl;
      });
    } catch (err) {
      console.error("Error preloading logo:", err);
    }

    let headerTextX = 15;
    if (logoImg) {
      try {
        doc.addImage(logoImg, 'PNG', 15, 12, 12, 12);
        headerTextX = 30;
      } catch (err) {
        console.error("Error drawing logo in PDF:", err);
      }
    }

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text('ASHONIKA', headerTextX, 21);

    // Subheader brand info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('GREEN ENERGY', headerTextX, 26);

    // Header Right - Website / Date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('https://greenenergy.ashonika.com/', 195, 21, { align: 'right' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('Solar Savings Estimator Report', 195, 26, { align: 'right' });

    // Draw decorative line below header
    doc.setDrawColor(226, 232, 240); // border-slate-200
    doc.setLineWidth(0.5);
    doc.line(15, 32, 195, 32);

    // Title of the document
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text('SOLAR FEASIBILITY & FINANCIAL VIABILITY REPORT', 15, 41);

    // Metadata card box
    doc.setFillColor(bgLightColor[0], bgLightColor[1], bgLightColor[2]);
    doc.roundedRect(15, 46, 180, 28, 3, 3, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`Location State/UT: `, 20, 53);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stateName}`, 55, 53);

    doc.setFont('helvetica', 'normal');
    doc.text(`Customer Category: `, 20, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`${categoryName}`, 55, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(`Report Date: `, 20, 67);
    doc.setFont('helvetica', 'bold');
    doc.text(`${new Date().toLocaleDateString('en-IN')}`, 55, 67);

    doc.setFont('helvetica', 'normal');
    const inputLabel = inputType === 'bill' ? 'Input Monthly Bill:' : 'Input Consumption:';
    const inputValueStr = inputType === 'bill' ? `Rs. ${parseFloat(inputValue).toLocaleString()}` : `${parseFloat(inputValue).toLocaleString()} kWh/Units`;
    doc.text(inputLabel, 115, 53);
    doc.setFont('helvetica', 'bold');
    doc.text(inputValueStr, 155, 53);

    doc.setFont('helvetica', 'normal');
    doc.text(`Grid Tariff Rate: `, 115, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`Rs. ${tariffRate} per kWh`, 155, 60);

    // Core Metrics Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('RECOMMENDED SYSTEM DESIGN', 15, 83);

    // 3 Columns of core specifications
    const cardY = 89;
    const cardHeight = 26;
    const cardWidth = 56;

    // Card 1: Plant Size
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(15, cardY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('RECOMMENDED CAPACITY', 18, cardY + 8);
    doc.setFontSize(16);
    doc.text(`${results.plantSize.toFixed(1)} kW`, 18, cardY + 18);

    // Card 2: Area
    doc.setFillColor(bgLightColor[0], bgLightColor[1], bgLightColor[2]);
    doc.roundedRect(15 + cardWidth + 6, cardY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('ROOFTOP AREA REQ.', 15 + cardWidth + 10, cardY + 8);
    doc.setFontSize(15);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`${results.areaRequired.toLocaleString()} Sq. Ft.`, 15 + cardWidth + 10, cardY + 18);

    // Card 3: Investment
    doc.setFillColor(bgLightColor[0], bgLightColor[1], bgLightColor[2]);
    doc.roundedRect(15 + (cardWidth * 2) + 12, cardY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('ESTIMATED INVESTMENT', 15 + (cardWidth * 2) + 16, cardY + 8);
    doc.setFontSize(15);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`Rs. ${averageInvestment.toLocaleString()}`, 15 + (cardWidth * 2) + 16, cardY + 18);

    // Investment Note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('*The above investment represents standard average pre-subsidy capital costs. Subsidies apply additionally.', 15, cardY + cardHeight + 4);

    // Detailed Solar Analysis Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('FINANCIAL SAVINGS & RETURNS', 15, 131);
    doc.text('ENERGY PRODUCTION & ENVIRONMENTAL IMPACT', 110, 131);

    // Draw lines below titles
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(15, 133, 100, 133);
    doc.line(110, 133, 195, 133);

    const rowStartY = 137;
    const rowHeight = 9.5;

    const financialRows = [
      { label: 'Monthly Utility Bill Savings', value: `Rs. ${results.monthlySavings.toLocaleString()}` },
      { label: 'Annual Energy Cost Savings', value: `Rs. ${results.annualSavings.toLocaleString()}` },
      { label: 'Lifetime Cumulative Savings', value: `Rs. ${results.lifetimeSavings.toLocaleString()}` },
      { label: 'Simple Payback Period', value: `${results.paybackPeriod.toFixed(1)} Years` },
      { label: 'Annual Return on Investment', value: `${results.roi.toFixed(1)} %` }
    ];

    const techRows = [
      { label: 'Average Monthly Generation', value: `${results.monthlyGen.toLocaleString()} kWh/Units` },
      { label: 'Cumulative Annual Generation', value: `${results.annualGen.toLocaleString()} kWh/Units` },
      { label: 'Lifetime Generation (25 Yrs)', value: `${results.lifetimeGen.toLocaleString()} kWh/Units` },
      { label: 'CO2 Greenhouse Gas Offset', value: `${results.co2Reduced.toFixed(1)} Tonnes` },
      { label: 'Equivalent Trees Planted', value: `${results.treesPlanted.toLocaleString()} Trees` }
    ];

    // Left Column (Financials)
    financialRows.forEach((row, index) => {
      const currentY = rowStartY + (index * rowHeight);
      
      // Zebra striping for left col
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, currentY, 85, rowHeight, 'F');
      }
      
      doc.setFont('helvetica', index >= 3 ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(row.label, 18, currentY + 6);
      
      doc.setFont('helvetica', 'bold');
      if (index >= 3) {
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      } else {
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      }
      doc.text(row.value, 97, currentY + 6, { align: 'right' });
    });

    // Right Column (Energy & Enviro)
    techRows.forEach((row, index) => {
      const currentY = rowStartY + (index * rowHeight);
      
      // Zebra striping for right col
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(110, currentY, 85, rowHeight, 'F');
      }
      
      doc.setFont('helvetica', index >= 3 ? 'bold' : 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(row.label, 113, currentY + 6);
      
      doc.setFont('helvetica', 'bold');
      if (index >= 3) {
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      } else {
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      }
      doc.text(row.value, 192, currentY + 6, { align: 'right' });
    });

    // Call to Action / Next Steps Block
    const ctaY = 194;
    doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.roundedRect(15, ctaY, 180, 28, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('SWITCH TO GREEN ENERGY TODAY — NEXT STEPS', 20, ctaY + 8);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(190, 210, 200);
    doc.text('1. Contact for custom quotes, design feasibility & grid connection paperwork with the Ashonika engineering team.', 20, ctaY + 14);
    doc.text('2. Schedule your site survey or email info@ashonika.com for direct custom on-site design planning.', 20, ctaY + 19);
    doc.text('3. Visit our website for more information: https://greenenergy.ashonika.com/', 20, ctaY + 24);

    // Technical Assumptions / Disclaimer
    const discY = 230;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('CALCULATION METHODOLOGY & ASSUMPTIONS', 15, discY);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(15, discY + 2, 195, discY + 2);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    
    const assumptions = [
      '• Capacity estimation is based on regional standard solar radiation index of 4.5 kWh/sq.m/day with 15% system losses.',
      '• Estimated cost represents benchmark market pricing for high-efficiency grid-tied monocrystalline solar plants pre-subsidy.',
      '• Standard financial return ignores annual utility tariff escalations, meaning actual long-term savings will likely be higher.',
      '• Environmental metrics: Carbon emission displacement is calculated at 0.82 kg CO2 per generated solar unit (kWh).'
    ];

    assumptions.forEach((line, i) => {
      doc.text(line, 15, discY + 8 + (i * 4.5));
    });

    // Document Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text('Page 1 of 1 • Generated via Ashonika Solar Estimator Engine • https://greenenergy.ashonika.com/', 105, 280, { align: 'center' });

    doc.save(`Ashonika-Solar-Report-${results.plantSize.toFixed(1)}kW.pdf`);
  };

  const getLoadingText = () => {
    const textsHi = [
      "क्षेत्रीय सौर विकिरण डेटा का विश्लेषण किया जा रहा है...",
      "आपकी बिजली खपत के अनुसार इष्टतम प्लांट साइज की गणना हो रही है...",
      "वित्तीय बचत और पर्यावरण लाभों का अनुमान लगाया जा रहा है...",
      "आपके लिए प्रीमियम सौर रिपोर्ट तैयार की जा रही है..."
    ];
    const textsEn = [
      "Analyzing regional solar radiation data...",
      "Sizing optimal solar plant layout for your consumption...",
      "Estimating dynamic financial savings and ROI...",
      "Generating your custom high-yield solar blueprint..."
    ];
    return language === 'hi' ? textsHi[loadingStep] : textsEn[loadingStep];
  };

  return (
    <section className="w-full py-12 md:py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase select-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>{language === 'hi' ? "स्मार्ट वित्तीय टूल्स" : "SMART FINANCIAL TOOLS"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            {language === 'hi' ? (
              <>
                आशोनिका <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">सौर कैलकुलेटर</span>
              </>
            ) : (
              <>
                Ashonika <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Solar Calculator</span>
              </>
            )}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === 'hi' 
              ? "अपने घर या व्यवसाय के लिए आवश्यक सोलर प्लांट का सटीक आकार, मासिक बचत, निवेश और पर्यावरण को होने वाले फायदों का तत्काल अनुमान लगाएं।"
              : "Instantly calculate the ideal solar plant size, monthly savings, lifetime financial benefits, and environmental impact tailored for your exact location."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* INPUT FORM */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-100 dark:shadow-none transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" />
              <span>{language === 'hi' ? "सोलर सिस्टम विवरण दर्ज करें" : "Enter System Specifications"}</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* STEP 1: BILL OR CONSUMPTION TOGGLE */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-350">
                  {language === 'hi' ? "चरण 1: गणना का आधार चुनें" : "Step 1: Choose Calculation Input"}
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setInputType('bill');
                      setInputValue('2500');
                    }}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                      inputType === 'bill'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {language === 'hi' ? "मासिक बिजली बिल (₹)" : "Monthly Bill (₹)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      inputType !== 'consumption' && setInputType('consumption');
                      setInputValue('300');
                    }}
                    className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                      inputType === 'consumption'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {language === 'hi' ? "मासिक खपत (Units/kWh)" : "Monthly Consumption (Units)"}
                  </button>
                </div>
              </div>

              {/* INPUT VALUE FIELD */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-50 font-extrabold text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-500 dark:text-slate-400">
                    {inputType === 'bill' ? '₹' : (language === 'hi' ? 'यूनिट (kWh)' : 'kWh')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  {inputType === 'bill' 
                    ? (language === 'hi' ? "*अपने औसत मासिक बिजली बिल की राशि दर्ज करें" : "*Enter the total average amount paid on your monthly utility bill")
                    : (language === 'hi' ? "*अपने पिछले महीने की बिजली की कुल खपत यूनिट में दर्ज करें" : "*Enter the total energy consumed in units/kWh as shown in your DISCOM bill")}
                </p>
              </div>

              {/* STEP 2: STATE & CATEGORY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* SELECT STATE UT */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'hi' ? "राज्य / केंद्र शासित प्रदेश" : "Select State / UT"}</span>
                  </label>
                  <select
                    value={selectedStateIndex}
                    onChange={(e) => setSelectedStateIndex(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {INDIAN_STATES.map((state, idx) => (
                      <option key={idx} value={idx}>
                        {language === 'hi' ? state.nameHi : state.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CUSTOMER CATEGORY */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'hi' ? "उपभोक्ता श्रेणी" : "Customer Category"}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCustomerCategory('residential')}
                      className={`py-2 px-2 rounded-lg font-bold text-xxs sm:text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        customerCategory === 'residential'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25'
                          : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? "घरेलू" : "Resi."}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerCategory('commercial')}
                      className={`py-2 px-2 rounded-lg font-bold text-xxs sm:text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        customerCategory === 'commercial'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25'
                          : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? "व्यावसायिक" : "Comm."}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerCategory('industrial')}
                      className={`py-2 px-2 rounded-lg font-bold text-xxs sm:text-xs tracking-wider uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        customerCategory === 'industrial'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25'
                          : 'text-slate-500 dark:text-slate-400 border border-transparent hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? "औद्योगिक" : "Ind."}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* STEP 3: TARIFF EDIT RATE */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-350 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span>{language === 'hi' ? "औसत बिजली दर (₹ प्रति यूनिट)" : "Average Electricity Cost (₹ / kWh)"}</span>
                  </span>
                  <span className="text-xs text-amber-500 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {language === 'hi' ? "संपादन योग्य" : "Editable"}
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="50"
                    required
                    value={tariffRate}
                    onChange={(e) => setTariffRate(e.target.value)}
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-50 font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 dark:text-slate-400">
                    {language === 'hi' ? "रुपये / kWh" : "INR / kWh"}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold italic mt-1.5">
                  {language === 'hi' 
                    ? `स्वचालित रूप से ${INDIAN_STATES[selectedStateIndex].nameHi.toUpperCase()} के औसत टैरिफ ₹${INDIAN_STATES[selectedStateIndex].defaultTariff}/kWh से भरा गया है। यदि आपका दर भिन्न है तो बदलें।`
                    : `Auto-filled with ${INDIAN_STATES[selectedStateIndex].nameEn.toUpperCase()}'s average tariff of ₹${INDIAN_STATES[selectedStateIndex].defaultTariff}/kWh. Adjust if your rate differs.`}
                </p>
              </div>

              {/* ACTION CALCULATE BUTTON */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-amber-500 hover:from-emerald-500 hover:via-emerald-400 hover:to-amber-400 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase cursor-pointer transition-all duration-300 transform hover:scale-[1.01] shadow-xl shadow-emerald-950/10 border border-emerald-400/20 flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <>
                    <Sun className="w-5 h-5 text-white animate-spin" />
                    <span>{language === 'hi' ? "गणना की जा रही है..." : "CALCULATING PROJECTIONS..."}</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    <span>{language === 'hi' ? "सोलर बचत की गणना करें" : "CALCULATE SOLAR SAVINGS"}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* LIVE CALCULATION PROGRESS PANEL */}
          <AnimatePresence mode="wait">
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl p-6 border border-emerald-500/20 text-center space-y-4"
              >
                <div className="flex justify-center">
                  <Sun className="w-10 h-10 text-emerald-500 animate-spin" />
                </div>
                <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">
                  {getLoadingText()}
                </p>
                <div className="w-full h-1.5 bg-emerald-100 dark:bg-emerald-950 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-linear-to-r from-emerald-500 to-amber-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* SECTION 2 - RESULTS PAGE GRID */}
        <div ref={resultsRef} className="mt-6">
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 20 }}
                className="space-y-5"
              >
                
                {/* RESULTS MAIN HEADER */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden transition-colors duration-300">
                  <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-emerald-500 to-amber-500" />
                  
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                      {language === 'hi' ? "सोलर कैलकुलेटर परिणाम" : "Solar Calculator Projections"}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {language === 'hi' 
                        ? `परिणाम की गणना: ${INDIAN_STATES[selectedStateIndex].nameHi} • ${customerCategory === 'residential' ? 'घरेलू' : customerCategory === 'commercial' ? 'व्यावसायिक' : 'औद्योगिक'}`
                        : `Sized for ${INDIAN_STATES[selectedStateIndex].nameEn} • ${customerCategory.toUpperCase()} rate of ₹${tariffRate}/kWh`}
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 font-bold text-[11px] text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{language === 'hi' ? "रीसेट करें" : "Reset Form"}</span>
                    </button>
                    <a
                      href="#contact"
                      className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] transition-all shadow-md shadow-emerald-950/10 cursor-pointer"
                    >
                      <span>{language === 'hi' ? "बुक करें" : "Book Consultation"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* MAIN CARDS: PLANT SIZE, AREA & INVESTMENT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* RECOMMENDED PLANT SIZE CARD */}
                  <div className="bg-emerald-600 text-white rounded-xl p-3.5 sm:p-4 shadow-md relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute -right-8 -top-8 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                    
                    <div className="space-y-1.5">
                      <div className="inline-flex p-1.5 bg-white/15 rounded-lg">
                        <Sun className="w-4.5 h-4.5 text-amber-300 animate-pulse-gentle" />
                      </div>
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-emerald-100">
                          {language === 'hi' ? "अनुशंसित सोलर प्लांट साइज" : "Recommended Solar Plant"}
                        </h4>
                        <p className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                          <AnimatedCounter value={results.plantSize} formatter={(v) => `${v.toFixed(1)} kW`} />
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-2 mt-3">
                      <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-amber-300" />
                        <span>{language === 'hi' ? "आपकी बिजली की 100% भरपाई हेतु" : "Tailored to fully offset your grid bill"}</span>
                      </p>
                    </div>
                  </div>

                  {/* AREA REQUIRED CARD */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800/60 shadow-md flex flex-col justify-between transition-colors duration-300">
                    <div className="space-y-1.5">
                      <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-lg text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800/40">
                        <Zap className="w-4.5 h-4.5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          {language === 'hi' ? "आवश्यक छत का क्षेत्रफल (लगभग)" : "Rooftop Area Required"}
                        </h4>
                        <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                          <AnimatedCounter value={results.areaRequired} formatter={(v) => `${v.toLocaleString()} sq.ft.`} />
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-3">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? "छाया मुक्त ठोस कंक्रीट या शीट छत क्षेत्र" : "Shadow-free south-facing rooftop clearance"}
                      </p>
                    </div>
                  </div>

                  {/* BUDGETARY ESTIMATE CARD */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800/60 shadow-md flex flex-col justify-between transition-colors duration-300">
                    <div className="space-y-1.5">
                      <div className="inline-flex p-1.5 bg-slate-100 dark:bg-slate-950 rounded-lg text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800/40">
                        <PiggyBank className="w-4.5 h-4.5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                          {language === 'hi' ? "अनुमानित सौर निवेश (औसत)" : "Estimated Solar Investment"}
                        </h4>
                        <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5 flex items-baseline gap-1">
                          <span>₹</span>
                          <AnimatedCounter value={Math.round((results.investmentEstimate.min + results.investmentEstimate.max) / 2)} formatter={(v) => v.toLocaleString()} />
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-3">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>*</span>
                        <span>{language === 'hi' ? "सरकारी सब्सिडी सीधे आपके बैंक खाते में उपलब्ध" : "National portal subsidies apply additionally"}</span>
                      </p>
                    </div>
                  </div>

                </div>

                {/* FINANCIAL RETURN ANALYSIS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* SIMPLE PAYBACK PERIOD */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800/60 shadow-md flex flex-col justify-between transition-colors duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="inline-flex p-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-655 dark:text-emerald-400 border border-emerald-500/10">
                          <RotateCcw className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                            {language === 'hi' ? "पेबैक अवधि (सरल)" : "Simple Payback Period"}
                          </h4>
                          <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50 tracking-tight mt-0.5">
                            <AnimatedCounter value={results.paybackPeriod} formatter={(v) => `${v.toFixed(1)} ${language === 'hi' ? 'वर्ष' : 'Years'}`} />
                          </p>
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/10">
                        {language === 'hi' ? "त्वरित रिकवरी" : "High-Speed Yield"}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-3">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? "वह समय जिसमें आपकी सौर बचत निवेश लागत को पूरा करती है" : "Time required to fully recover your upfront solar technology investment"}
                      </p>
                    </div>
                  </div>

                  {/* ANNUAL RETURN ON INVESTMENT */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800/60 shadow-md flex flex-col justify-between transition-colors duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="inline-flex p-1.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-500/10">
                          <TrendingUp className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                            {language === 'hi' ? "वार्षिक निवेश रिटर्न (ROI)" : "Annual Return on Investment (ROI)"}
                          </h4>
                          <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5">
                            <AnimatedCounter value={results.roi} formatter={(v) => `${v.toFixed(1)}%`} />
                          </p>
                        </div>
                      </div>
                      <div className="bg-amber-550/10 text-amber-600 dark:text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-amber-500/10">
                        {language === 'hi' ? "सावधि जमा से 3 गुना बेहतर" : "3x Better Than FD"}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-3">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {language === 'hi' ? "फिक्स डिपॉजिट या म्यूचुअल फंड की तुलना में उत्कृष्ट टैक्स-फ्री रिटर्न दर" : "Consistent tax-free annual yield generated by your solar system asset"}
                      </p>
                    </div>
                  </div>

                </div>

                {/* INTERACTIVE BENTO GRID: PRODUCTION & FINANCIAL SAVINGS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* GENERATION BLUEPRINT (LEFT BENTO) */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-3.5 border border-slate-200 dark:border-slate-800/60 shadow-md space-y-3 transition-colors duration-300">
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-50 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>{language === 'hi' ? "अनुमानित सौर ऊर्जा उत्पादन (kWh)" : "Estimated Electricity Generation"}</span>
                    </h4>

                    <div className="space-y-2">
                      
                      {/* MONTHLY GEN */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{language === 'hi' ? "मासिक उत्पादन" : "Monthly Generation"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">{language === 'hi' ? "प्रति माह औसत उत्पादन" : "Average generated units monthly"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                          <AnimatedCounter value={results.monthlyGen} formatter={(v) => `${v.toLocaleString()} Units`} />
                        </p>
                      </div>

                      {/* ANNUAL GEN */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{language === 'hi' ? "वार्षिक उत्पादन" : "Annual Generation"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">{language === 'hi' ? "प्रति वर्ष संचयी ऊर्जा" : "Cumulative solar energy annually"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                          <AnimatedCounter value={results.annualGen} formatter={(v) => `${v.toLocaleString()} Units`} />
                        </p>
                      </div>

                      {/* LIFETIME GEN */}
                      <div className="p-2.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">{language === 'hi' ? "कुल संचयी उत्पादन (25 वर्ष)" : "Lifetime Generation (25 Years)"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-450">{language === 'hi' ? "सौर पैनल की पूर्ण परिचालन अवधि" : "Full operational design lifespan"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                          <AnimatedCounter value={results.lifetimeGen} formatter={(v) => `${v.toLocaleString()} Units`} />
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* FINANCIAL SAVINGS BLUEPRINT (RIGHT BENTO) */}
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-3.5 border border-slate-200 dark:border-slate-800/60 shadow-md space-y-3 transition-colors duration-300">
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-50 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/60 pb-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>{language === 'hi' ? "वित्तीय बचत अनुमान (₹)" : "Estimated Financial Savings"}</span>
                    </h4>

                    <div className="space-y-2">
                      
                      {/* MONTHLY SAVINGS */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{language === 'hi' ? "मासिक बचत" : "Monthly Savings"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">{language === 'hi' ? "पहले महीने से बिजली बिल में कटौती" : "Reduction in utility bills first month"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-450">
                          <AnimatedCounter value={results.monthlySavings} formatter={(v) => `₹ ${v.toLocaleString()}`} />
                        </p>
                      </div>

                      {/* ANNUAL SAVINGS */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{language === 'hi' ? "वार्षिक बचत" : "Annual Savings"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">{language === 'hi' ? "वार्षिक संचयी वित्तीय लाभ" : "Yearly accumulated bill credits"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-450">
                          <AnimatedCounter value={results.annualSavings} formatter={(v) => `₹ ${v.toLocaleString()}`} />
                        </p>
                      </div>

                      {/* LIFETIME SAVINGS */}
                      <div className="p-2.5 rounded-lg bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">{language === 'hi' ? "कुल संचयी बचत (25 वर्ष)" : "Lifetime Savings (25 Years)"}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-450">{language === 'hi' ? "टैक्स फ्री संचयी वेल्थ क्रिएशन" : "Tax-free cumulative wealth generated"}</p>
                        </div>
                        <p className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-450">
                          <AnimatedCounter value={results.lifetimeSavings} formatter={(v) => `₹ ${v.toLocaleString()}`} />
                        </p>
                      </div>

                    </div>
                  </div>

                </div>

                {/* ENVIRONMENTAL ECO BENEFITS (FULL WIDTH) */}
                <div className="bg-linear-to-r from-emerald-950 to-slate-950 text-white rounded-xl p-3 sm:p-3.5 border border-emerald-900/40 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-black tracking-tight flex items-center gap-1.5 text-emerald-400">
                        <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{language === 'hi' ? "आपके सौर प्रोजेक्ट के पर्यावरणीय लाभ" : "Environmental Dividends"}</span>
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-300 leading-relaxed max-w-xl">
                        {language === 'hi'
                          ? "रूफटॉप सौर पैनलों पर संक्रमण करके, आप कार्बन फुटप्रिंट को काफी कम करते हैं। कोयला आधारित बिजली की जगह स्वच्छ सौर ऊर्जा का यह योगदान आपके परिवेश को हरा-भरा बनाता है।"
                          : "By routing your electricity demand to solar, you displace coal-fired dispatch. Here is the cumulative positive footprint equivalent of your system over 25 years."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-2.5 md:pt-0 md:pl-4">
                      
                      {/* CO2 CARDS */}
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                          {language === 'hi' ? "CO₂ कार्बन उत्सर्जन में कमी" : "CO₂ Reduction"}
                        </p>
                        <p className="text-lg sm:text-xl font-black text-white flex items-baseline gap-0.5">
                          <AnimatedCounter value={results.co2Reduced} formatter={(v) => v.toFixed(1)} />
                          <span className="text-[10px] text-emerald-400 font-bold">{language === 'hi' ? "टन" : "Tonnes"}</span>
                        </p>
                      </div>

                      {/* TREES PLANTED CARDS */}
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                          <TreePine className="w-3 h-3 text-emerald-400" />
                          <span>{language === 'hi' ? "रोपे गए पेड़ों के बराबर" : "Trees Equivalent"}</span>
                        </p>
                        <p className="text-lg sm:text-xl font-black text-emerald-400">
                          <AnimatedCounter value={results.treesPlanted} formatter={(v) => v.toLocaleString()} />
                        </p>
                      </div>

                    </div>

                  </div>
                </div>

                {/* SHARE REPORT BAR */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl md:rounded-full p-4 sm:p-5 border border-slate-200 dark:border-slate-800/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
                  {/* Left Side: Label & Icon */}
                  <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-100 font-extrabold text-sm sm:text-base">
                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <span>{language === 'hi' ? "रिपोर्ट साझा करें" : "Share Report"}</span>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    {/* Instagram Share Option */}
                    <button
                      onClick={handleInstagramShare}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg sm:rounded-full bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] hover:scale-[1.02] active:scale-[0.98] text-white font-extrabold text-[11px] sm:text-xs tracking-wide shadow-sm hover:opacity-95 transition-all cursor-pointer shrink-0"
                    >
                      <svg className="w-3.5 h-3.5 fill-white stroke-none" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                      <span>Instagram</span>
                    </button>

                    {/* WhatsApp Share */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${(() => {
                        const stateName = language === 'hi' ? INDIAN_STATES[selectedStateIndex].nameHi : INDIAN_STATES[selectedStateIndex].nameEn;
                        const categoryName = customerCategory === 'residential' 
                          ? (language === 'hi' ? 'घरेलू (Residential)' : 'Residential')
                          : customerCategory === 'commercial' 
                            ? (language === 'hi' ? 'व्यावसायिक (Commercial)' : 'Commercial')
                            : (language === 'hi' ? 'औद्योगिक (Industrial)' : 'Industrial');
                        const inputValStr = inputType === 'bill' 
                          ? `Rs. ${parseFloat(inputValue).toLocaleString()}/month` 
                          : `${parseFloat(inputValue).toLocaleString()} Units/month`;

                        const msg = 
                          `*Ashonika Green Energy Solar Report* ☀️🌱\n\n` +
                          `*1. INPUT PARAMETERS:*\n` +
                          `• *State/UT:* ${stateName}\n` +
                          `• *Category:* ${categoryName}\n` +
                          `• *Monthly Consumption:* ${inputValStr}\n` +
                          `• *Grid Tariff Rate:* Rs. ${tariffRate}/kWh\n\n` +
                          `*2. RECOMMENDED SYSTEM DESIGN:*\n` +
                          `• *Solar Capacity:* ${results.plantSize.toFixed(1)} kW\n` +
                          `• *Rooftop Area:* ${results.areaRequired.toLocaleString()} sq.ft.\n` +
                          `• *Estimated Investment:* Rs. ${Math.round((results.investmentEstimate.min + results.investmentEstimate.max) / 2).toLocaleString()}\n\n` +
                          `*3. ENERGY GENERATION ESTIMATES:*\n` +
                          `• *Monthly Generation:* ${results.monthlyGen.toLocaleString()} kWh/Units\n` +
                          `• *Annual Generation:* ${results.annualGen.toLocaleString()} kWh/Units\n` +
                          `• *Lifetime Generation (25 Yrs):* ${results.lifetimeGen.toLocaleString()} kWh/Units\n\n` +
                          `*4. FINANCIAL SAVINGS & RETURN:*\n` +
                          `• *Monthly Bill Savings:* Rs. ${results.monthlySavings.toLocaleString()}\n` +
                          `• *Annual Energy Savings:* Rs. ${results.annualSavings.toLocaleString()}\n` +
                          `• *Lifetime Cumulative Savings (25 Yrs):* Rs. ${results.lifetimeSavings.toLocaleString()}\n` +
                          `• *Simple Payback Period:* ${results.paybackPeriod.toFixed(1)} Years\n` +
                          `• *Annual ROI:* ${results.roi.toFixed(1)}%\n\n` +
                          `*5. ENVIRONMENTAL REDUCTION IMPACT:*\n` +
                          `• *CO2 Emissions Avoided:* ${results.co2Reduced.toFixed(1)} Tonnes\n` +
                          `• *Equivalent Trees Planted:* ${results.treesPlanted.toLocaleString()} Trees\n\n` +
                          `Calculate your custom solar savings blueprint at:\n` +
                          `https://greenenergy.ashonika.com/`;
                        return encodeURIComponent(msg);
                      })()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg sm:rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-[11px] sm:text-xs tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm5.835-4.117c1.652.98 3.271 1.498 4.748 1.499 5.486 0 9.948-4.463 9.952-9.954.002-2.659-1.03-5.159-2.906-7.038C15.808 2.508 13.315 1.478 10.66 1.477c-5.489 0-9.954 4.464-9.958 9.957-.001 2.01.527 3.973 1.53 5.71l-.999 3.647 3.73-.978zm13.113-7.516c-.302-.152-1.791-.883-2.067-.984-.277-.101-.479-.152-.68.152-.201.302-.781.984-.956 1.186-.176.201-.353.227-.655.075-.302-.152-1.275-.47-2.428-1.499-.896-.8-1.5-.178-1.677-.48-.177-.302-.019-.465.132-.615.136-.135.302-.353.453-.529.151-.177.201-.277.302-.454.101-.177.05-.353-.025-.504-.075-.152-.68-1.639-.933-2.248-.247-.594-.499-.514-.68-.523-.176-.009-.378-.011-.58-.011-.202 0-.53.076-.807.379-.277.302-1.058 1.034-1.058 2.522 0 1.488 1.083 2.928 1.234 3.129.151.202 2.132 3.256 5.166 4.564.721.311 1.284.498 1.723.638.724.23 1.382.197 1.902.12.579-.085 1.791-.732 2.043-1.438.252-.706.252-1.312.176-1.438-.076-.126-.277-.202-.579-.354z" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>

                    {/* Download PDF button */}
                    <button
                      onClick={() => setShowPdfConfirm(true)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg sm:rounded-full bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-[11px] sm:text-xs tracking-wide shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <polyline points="9 15 12 18 15 15" />
                      </svg>
                      <span>{language === 'hi' ? "पीडीएफ रिपोर्ट" : "Download PDF"}</span>
                    </button>
                  </div>
                </div>

                {/* Premium PDF Confirm Dialog Modal */}
                <AnimatePresence>
                  {showPdfConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6"
                      >
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                          <Sun className="w-8 h-8 animate-spin-slow" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {language === 'hi' ? "सोलर रिपोर्ट डाउनलोड करें?" : "Download Solar Blueprint?"}
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {language === 'hi' 
                              ? "क्या आप अपने कस्टमाइज्ड सोलर रिपोर्ट का पीडीएफ डाउनलोड करना चाहते हैं? इसमें आपका पूरा वित्तीय विश्लेषण शामिल है।"
                              : "Would you like to download your comprehensive engineering and financial Solar feasibility report PDF?"}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setShowPdfConfirm(false)}
                            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer"
                          >
                            {language === 'hi' ? "नहीं" : "No"}
                          </button>
                          <button
                            onClick={handleGeneratePDF}
                            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-950/15 cursor-pointer"
                          >
                            {language === 'hi' ? "हाँ, डाउनलोड करें" : "Yes, Download"}
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Instagram copy feedback toast */}
                <AnimatePresence>
                  {showShareToast && (
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      className="fixed bottom-6 right-6 z-[9999] bg-slate-900 dark:bg-slate-950 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-slate-800 max-w-sm"
                    >
                      <div className="p-2 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#F77737] text-white shrink-0">
                        <svg className="w-5 h-5 fill-white stroke-none" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-extrabold text-sm text-slate-100">
                          {language === 'hi' ? "क्लिपबोर्ड पर कॉपी किया गया!" : "Copied to Clipboard!"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {language === 'hi' 
                            ? "इंस्टाग्राम फॉर्मेट रिपोर्ट कॉपी हो गई है। आप इसे सीधे पेस्ट कर सकते हैं!" 
                            : "Instagram formatted report is copied. You can paste it directly!"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
