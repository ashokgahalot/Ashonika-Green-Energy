/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (section: string, key: string, fallback?: string) => string;
  tArray: (section: string, key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, any>> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      timeline: 'Why Choose Us',
      projects: 'Projects',
      faqs: 'FAQs',
      calculator: 'Solar Calculator',
      getQuote: 'GET QUOTE',
    },
    hero: {
      tag: "Tomorrow's Smart Grid Today",
      heading: "Turn Your Electricity Bill Into a Long-Term Asset",
      description: "End-to-End Solar EPC Solutions Designed for Maximum Savings and Long-Term Performance.",
      button: "FREE SOLAR CONSULTATION",
    },
    about: {
      badge: "WORLD-CLASS CLEAN ENERGY",
      heading: "About Ashonika",
      para1: "Ashonika stands at the forefront of the clean energy transition, specializing in premium, high-tier Solar Engineering, Procurement, and Commissioning (EPC) solutions. We are dedicated to delivering highly efficient grid-tied, hybrid, and off-grid power structures that empower residential, business, and industrial clients with complete energy independence.",
      para2: "By integrating state-of-the-art monocrystalline PV modules, smart solid-state inverter systems, and durable power storage technology, Ashonika transforms idle spaces into high-yield clean energy generators. Our certified engineering framework guarantees maximum structural safety, long-term electricity yield, and reliable post-commissioning support—powering a sustainable tomorrow for decades to come.",
    },
    trusted: {
      badge: "STRATEGIC NETWORK",
      heading: "Associated With",
      description: "Collaboratively driving high-efficiency clean energy deployments across key operational domains.",
    },
    services: {
      heading: "Our Premium Power Solutions",
      description: "Engineered systems designed to transition homes and heavy industries to high-efficiency, independent green microgrids.",
      
      residential_title: "Residential Solar",
      residential_capacity: "3 kW to 15 kW",
      residential_desc: "Elegant solar panel installations tailored for smart homes. Save up to 90% on monthly utility bills.",
      residential_button: "FREE SITE SURVEY",

      commercial_title: "Commercial Solar",
      commercial_capacity: "10 kW to 100 kW",
      commercial_desc: "Reliable rooftop, carport, and ground-mount PV installations for corporate offices, malls, and clinics.",
      commercial_button: "FREE SITE SURVEY",

      industrial_title: "Industrial Solar",
      industrial_capacity: "100 kW to 5 MW+",
      industrial_desc: "Megawatt-scale microgrid architectures for factories, warehouses, cold storage, and heavy industries.",
      industrial_button: "FREE SITE SURVEY",

      epc_title: "Solar EPC Solutions",
      epc_capacity: "Custom Scale",
      epc_desc: "Comprehensive, end-to-end solar solutions, including feasibility research, layout, and complete setup.",
      epc_button: "FREE SITE SURVEY",

      metering_title: "Net Metering Assistance",
      metering_capacity: "All Grid Scales",
      metering_desc: "Seamless regulatory approvals, DISCOM inspection filings, and meter upgrades for energy sellbacks.",
      metering_button: "FREE SITE SURVEY",

      maintenance_title: "Solar Maintenance",
      maintenance_capacity: "Annual Contracts",
      maintenance_desc: "Periodic thermal testing, robotic panel wash solutions, checkups, and guaranteed uptime.",
      maintenance_button: "FREE SITE SURVEY",
    },
    whyPartner: {
      badge: "UNCOMPROMISED CORPORATE STANDARDS",
      heading: "Why Partner with Ashonika?",
      subheading: "We deliver state-of-the-art clean energy solutions backed by rigorous certified safety engineering.",
      
      f1_title: "Premium Quality Products",
      f1_desc: "We prioritize Tier-1 micro-silicon hardware with 25-Year peak performance guarantees.",
      
      f2_title: "Certified Engineers",
      f2_desc: "In-house design and deployment managed strictly by licensed master electricians and civil leads.",
      
      f3_title: "Government Subsidy Support",
      f3_desc: "Hassle-free application submission under regional net-metering schemes and state quotas.",
      
      f4_title: "Precision Fast Installation",
      f4_desc: "Rapid structural deployment within 72 hours of regulatory civil approvals.",
      
      f5_title: "Lifetime Expert Support",
      f5_desc: "24/7 prioritized operational response with on-demand service dispatches.",
      
      f6_title: "Performance Monitoring",
      f6_desc: "Continuous cloud-linked performance tracking dashboard with predictive maintenance alerts.",
    },
    brandPartners: {
      badge: "AUTHORIZED COMPONENT ECOSYSTEM",
      heading: "Our Elite Solar Brand Partners",
      subheading: "We procure only Tier-1 equipment and premium hardware from the industry's most reputable manufacturers. Your rooftop solar system is engineered for guaranteed output, safety, and operational longevity.",
      
      warranty_title: "Manufacturer Backed Warranty Agreements",
      warranty_desc: "Our direct partnerships ensure 10 to 12 Year Manufacturer Warranties on Smart Inverters and up to 25 to 30 Year Linear Power Warranties on premium Photovoltaic Panels.",
      warranty_badge: "100% Guaranteed Genuine Components",
    },
    projects: {
      badge: "PROVEN OPERATIONAL TRACK RECORD",
      heading: "Our Grid Commissioned Sites",
      subheading: "Explore our real-world custom layouts, highlighting empty spaces on before-after premium smart solar grid commissioning.",
      button: "ALL SITES",
    },
    process: {
      badge: "ENGINEERING WORKFLOW PIPELINE",
      heading: "Our 6-Step Solar Journey",
      subheading: "From the initial layout estimates down to double-checked net-meter grid syncing, we supervise every milestone.",
      
      step1_title: "Consultation & Feasibility",
      step2_title: "Site Survey & Engineering",
      step3_title: "Bespoke Grid Design",
      step4_title: "Permitting & Approvals",
      step5_title: "Civil & Panel Installation",
      step6_title: "Commissioning & Sync",

      step1_badge: "Step 01 | Standard Execution Phase 01",
      step1_heading: "Consultation & Feasibility",
      step1_desc: "Initial structural, billing assessment, and financial savings calculations.",
      step1_points: [
        "Analyze past 12-month electric utility records",
        "Simulate ROI solar payback periods using CAD models",
        "Finalize custom finance options and state subsidy eligibility check"
      ],

      step2_badge: "Step 02 | Standard Execution Phase 02",
      step2_heading: "Site Survey & Engineering",
      step2_desc: "Our expert engineering team inspects your roof to determine capacity, load limits, and safety feasibility.",
      step2_points: [
        "Drone assessment & site shade mapping",
        "Roof structural weight-load certification",
        "Optimal solar coordinate placement and cabling path layout"
      ],

      step3_badge: "Step 03 | Standard Execution Phase 03",
      step3_heading: "Bespoke Grid Design",
      step3_desc: "Tailored CAD models engineered dynamically based on structural factors and utility capacity limits.",
      step3_points: [
        "3D shade-tolerant configuration models",
        "Premium micro-inverter and panel tilt calibration",
        "Structural wind-load certification up to 150km/h"
      ],

      step4_badge: "Step 04 | Standard Execution Phase 04",
      step4_heading: "Permitting & Approvals",
      step4_desc: "Hassle-free documentation and DISCOM network filings processed through licensed legal liaisons.",
      step4_points: [
        "DISCOM solar interconnection application filings",
        "State rooftop subsidy quota block allocation",
        "Net-metering safety clearance certification"
      ],

      step5_badge: "Step 05 | Standard Execution Phase 05",
      step5_heading: "Civil & Panel Installation",
      step5_desc: "Rapid certified solar installation completed inside strict deadlines with zero operational downtime.",
      step5_points: [
        "Galvanized rust-proof heavy mounting arrays",
        "Premium Tier-1 panel alignments and DC wiring",
        "Smart solid-state inverter grid integrations"
      ],

      step6_badge: "Step 06 | Standard Execution Phase 06",
      step6_heading: "Commissioning & Sync",
      step6_desc: "Double-checked safety system start, local utility inspector check, and digital app sync.",
      step6_points: [
        "Professional engineering performance check",
        "Net-meter activation and power export sync",
        "Mobile monitoring app setup and cloud logging"
      ],

      right_quality: "ENGINEERING QUALITY",
      right_certified: "Certified Installation",
      right_compliance: "FULL COMPLIANCE",
    },
    faqs: {
      badge: "SOLAR KNOWLEDGE BASE",
      heading: "Frequently Asked Questions",
      description: "Find instant, clear, and comprehensive answers to all your rooftop solar, net metering, and installation questions.",
      small_label: "POPULAR SOLAR GUIDES",
    },
    contact: {
      badge: "CORPORATE COMMUNICATIONS",
      heading: "Connect With Our Power Experts",
      description: "Have a custom requirement, installation request, or maintenance query? Fill out our validated request form below.",
    },
    footer: {
      description: "Ashonika Green Energy is a premier certified solar EPC corporation specializing in high-voltage microgrid layouts, net-metering synchronization, and lifetime tracking coordinates for commercial, public, and private properties.",
    }
  },
  hi: {
    nav: {
      home: 'होम',
      about: 'हमारे बारे में',
      services: 'सेवाएँ',
      timeline: 'हमें क्यों चुनें',
      projects: 'हमारे प्रोजेक्ट',
      faqs: 'सामान्य प्रश्न',
      calculator: 'सोलर कैलकुलेटर',
      getQuote: 'कोटेशन प्राप्त करें',
    },
    hero: {
      tag: "भविष्य की स्मार्ट ऊर्जा, आज ही अपनाएँ",
      heading: "बिजली के बढ़ते खर्च से छुटकारा पाएँ, सोलर के साथ बचत की नई शुरुआत करें।",
      description: "हम आपके घर, व्यवसाय और उद्योग के लिए संपूर्ण Solar EPC समाधान उपलब्ध कराते हैं, जिससे बिजली की अधिकतम बचत, बेहतर प्रदर्शन और वर्षों तक भरोसेमंद ऊर्जा सुनिश्चित होती है।",
      button: "निःशुल्क सोलर परामर्श प्राप्त करें",
    },
    about: {
      badge: "विश्वस्तरीय स्वच्छ ऊर्जा",
      heading: "Ashonika के बारे में",
      para1: "Ashonika स्वच्छ ऊर्जा क्रांति में अग्रणी कंपनियों में से एक है, जो उच्च गुणवत्ता वाले Solar Engineering, Procurement एवं Commissioning (EPC) समाधानों में विशेषज्ञता रखती है। हम घरों, व्यवसायों और उद्योगों के लिए अत्यधिक दक्षता वाले On-Grid, Hybrid एवं Off-Grid सोलर सिस्टम उपलब्ध कराते हैं, ताकि हमारे ग्राहक ऊर्जा के क्षेत्र में पूर्ण आत्मनिर्भरता प्राप्त कर सकें।",
      para2: "Ashonika Green Energy भारत में विश्वसनीय Solar EPC कंपनियों में से एक है, जो घरों, व्यवसायों और उद्योगों के लिए आधुनिक एवं उच्च गुणवत्ता वाले सोलर समाधान प्रदान करती है। हमारी अनुभवी इंजीनियरिंग टीम प्रत्येक परियोजना को योजना, डिज़ाइन, इंस्टॉलेशन और कमीशनिंग के उच्चतम मानकों के साथ पूरा करती है।\nहम अत्याधुनिक Solar Panels, उन्नत Inverter Technology और मजबूत ऊर्जा भंडारण समाधानों का उपयोग करके आपके खाली स्थान को ऊर्जा उत्पादन के एक स्थायी स्रोत में बदलते हैं। हमारा उद्देश्य केवल सोलर सिस्टम लगाना नहीं, बल्कि आपको कम बिजली बिल, अधिक बचत और वर्षों तक निर्बाध ऊर्जा का भरोसा देना है।",
    },
    trusted: {
      badge: "विश्वसनीय साझेदार",
      heading: "हमारे प्रतिष्ठित सहयोगी",
      description: "उद्योग की अग्रणी कंपनियों और ब्रांडों के साथ हमारी मजबूत साझेदारी हमें उच्च गुणवत्ता वाले, विश्वसनीय और आधुनिक सोलर समाधान प्रदान करने में सक्षम बनाती है।",
    },
    services: {
      heading: "हमारे आधुनिक और भरोसेमंद सोलर ऊर्जा समाधान",
      description: "ऐसे आधुनिक ऊर्जा समाधान जो घरों से लेकर बड़े उद्योगों तक को बेहतर दक्षता, कम बिजली खर्च और आत्मनिर्भर ग्रीन एनर्जी सिस्टम की ओर ले जाने के लिए तैयार किए गए हैं।",
      
      residential_title: "रेजिडेंशियल सोलर (घरों के लिए सोलर सिस्टम)",
      residential_capacity: "3 kW to 15 kW",
      residential_desc: "स्मार्ट घरों के लिए विशेष रूप से तैयार किए गए खूबसूरत और भरोसेमंद सोलर पैनल सिस्टम। बिजली के मासिक बिल में 90% तक की बचत करें और अपने घर को ऊर्जा आत्मनिर्भर बनाएं।",
      residential_button: "मुफ्त साइट सर्वे करवाएं",

      commercial_title: "कमर्शियल सोलर (व्यावसायिक सोलर समाधान)",
      commercial_capacity: "10 kW to 100 kW",
      commercial_desc: "कॉर्पोरेट ऑफिस, मॉल, अस्पताल और अन्य व्यावसायिक स्थानों के लिए भरोसेमंद रूफटॉप, कारपोर्ट और ग्राउंड-माउंट सोलर सिस्टम। बिजली खर्च कम करें और व्यवसाय को ग्रीन एनर्जी से जोड़ें।",
      commercial_button: "मुफ्त साइट सर्वे करवाएं",

      industrial_title: "इंडस्ट्रियल सोलर (औद्योगिक सोलर समाधान)",
      industrial_capacity: "100 kW to 5 MW+",
      industrial_desc: "फैक्ट्रियों, वेयरहाउस, कोल्ड स्टोरेज और बड़े उद्योगों के लिए मेगावाट स्तर के सोलर माइक्रोग्रिड समाधान। बड़े पैमाने पर ऊर्जा बचत और बेहतर पावर मैनेजमेंट के लिए डिज़ाइन किए गए सिस्टम।",
      industrial_button: "मुफ्त साइट सर्वे करवाएं",

      epc_title: "सोलर EPC सॉल्यूशंस (पूर्ण सोलर समाधान)",
      epc_capacity: "कस्टम स्केल",
      epc_desc: "शुरुआत से लेकर पूरा सिस्टम तैयार करने तक सभी प्रकार की सोलर सेवाएं। इसमें साइट सर्वे, प्रोजेक्ट प्लानिंग, डिजाइन, इंस्टॉलेशन और पूरा सेटअप शामिल है।",
      epc_button: "मुफ्त साइट सर्वे करवाएं",

      metering_title: "नेट मीटरिंग सहायता",
      metering_capacity: "सभी ग्रिड स्केल",
      metering_desc: "नेट मीटरिंग प्रक्रिया को आसान बनाएं। हम सरकारी अनुमोदन, DISCOM निरीक्षण, दस्तावेज़ी प्रक्रिया और मीटर अपग्रेड में पूरी सहायता प्रदान करते हैं ताकि आप अतिरिक्त बिजली को ग्रिड में बेच सकें।",
      metering_button: "मुफ्त साइट सर्वे करवाएं",

      maintenance_title: "सोलर मेंटेनेंस (रखरखाव सेवाएं)",
      maintenance_capacity: "वार्षिक अनुबंध",
      maintenance_desc: "आपके सोलर सिस्टम की बेहतर परफॉर्मेंस के लिए नियमित जांच, थर्मल टेस्टिंग, रोबोटिक पैनल क्लीनिंग और समय-समय पर मेंटेनेंस सेवाएं।",
      maintenance_button: "मुफ्त साइट सर्वे करवाएं",
    },
    whyPartner: {
      badge: "बेहतरीन गुणवत्ता और विश्वसनीय सेवा का वादा",
      heading: "Ashonika को अपना सोलर पार्टनर क्यों चुनें?",
      subheading: "हम आधुनिक, सुरक्षित और भरोसेमंद सोलर ऊर्जा समाधान प्रदान करते हैं, जिन्हें अनुभवी विशेषज्ञों द्वारा उच्च गुणवत्ता और सुरक्षा मानकों के साथ स्थापित किया जाता है।",
      
      f1_title: "उच्च गुणवत्ता वाले सोलर उत्पाद",
      f1_desc: "हम केवल विश्वसनीय Tier-1 गुणवत्ता वाले सोलर पैनल और उपकरण का उपयोग करते हैं, जिनकी 25 वर्षों तक बेहतर प्रदर्शन की गारंटी होती है।",
      
      f2_title: "प्रमाणित एवं अनुभवी इंजीनियर",
      f2_desc: "हमारी विशेषज्ञ टीम आपके सोलर सिस्टम का डिज़ाइन और इंस्टॉलेशन पूरी तरह प्रशिक्षित एवं प्रमाणित इंजीनियरों की देखरेख में करती है।",
      
      f3_title: "सरकारी सब्सिडी में पूरी सहायता",
      f3_desc: "हम सरकारी सब्सिडी और नेट मीटरिंग की पूरी प्रक्रिया में आपकी सहायता करते हैं, ताकि आपको बिना किसी परेशानी के सभी लाभ मिल सकें सकें।",
      
      f4_title: "तेज़ और सुरक्षित इंस्टॉलेशन",
      f4_desc: "सभी आवश्यक अनुमतियाँ मिलने के बाद हमारी टीम कम समय में सुरक्षित और व्यवस्थित तरीके से सोलर सिस्टम स्थापित करती है।",
      
      f5_title: "इंस्टॉलेशन के बाद भी लगातार सहायता",
      f5_desc: "इंस्टॉलेशन के बाद भी हमारी विशेषज्ञ टीम आपकी सहायता के लिए हमेशा उपलब्ध रहती है, ताकि आपका सोलर सिस्टम बिना रुकावट के चलता रहे।",
      
      f6_title: "स्मार्ट परफॉर्मेंस मॉनिटरिंग",
      f6_desc: "आप अपने सोलर सिस्टम की बिजली उत्पादन और प्रदर्शन की जानकारी आसानी से देख सकते हैं। किसी भी समस्या की स्थिति में समय रहते सूचना और सहायता उपलब्ध कराई जाती है।",
    },
    brandPartners: {
      badge: "अधिकृत एवं विश्वसनीय सोलर ब्रांड्स",
      heading: "हमारे विश्वसनीय सोलर ब्रांड पार्टनर्स",
      subheading: "हम आपके सोलर सिस्टम के लिए केवल Tier-1 गुणवत्ता वाले पैनल, इन्वर्टर और अन्य प्रीमियम उपकरण चुनते हैं। हमारे विश्वसनीय ब्रांड पार्टनर्स के साथ मिलकर हम ऐसा रूफटॉप सोलर समाधान प्रदान करते हैं जो अधिक बिजली उत्पादन, बेहतर सुरक्षा और वर्षों तक भरोसेमंद प्रदर्शन सुनिश्चित करता है।",
      
      warranty_title: "निर्माता द्वारा पक्की वारंटी",
      warranty_desc: "हम केवल विश्वसनीय ब्रांड्स के साथ काम करते हैं, इसलिए आपको स्मार्ट इन्वर्टर पर 10–12 वर्ष की कंपनी वारंटी तथा प्रीमियम सोलर पैनलों पर 25–30 वर्ष तक की प्रदर्शन (Linear Power) वारंटी का लाभ मिलता है।",
      warranty_badge: "100% असली और प्रमाणित उपकरण",
    },
    projects: {
      badge: "सफलतापूर्वक पूर्ण किए गए सोलर प्रोजेक्ट्स",
      heading: "हमारे सफलतापूर्वक स्थापित सोलर प्रोजेक्ट्स",
      subheading: "हमारे सफल सोलर प्रोजेक्ट्स देखें और जानें कि किस प्रकार हमने विभिन्न घरों, व्यवसायों और संस्थानों में उपलब्ध स्थान का सर्वोत्तम उपयोग करके सुरक्षित एवं उच्च गुणवत्ता वाले सोलर सिस्टम स्थापित किए हैं।",
      button: "सभी प्रोजेक्ट्स",
    },
    process: {
      badge: "सोलर इंस्टॉलेशन की प्रक्रिया",
      heading: "सोलर इंस्टॉलेशन की हमारी 6-चरणीय प्रक्रिया",
      subheading: "प्रारंभिक सलाह और साइट निरीक्षण से लेकर डिज़ाइन, सरकारी अनुमतियाँ, इंस्टॉलेशन और नेट मीटरिंग तक—हम पूरी प्रक्रिया के प्रत्येक चरण की विशेषज्ञ टीम द्वारा निगरानी करते हैं।",
      
      step1_title: "परामर्श एवं व्यवहार्यता जाँच",
      step2_title: "साइट सर्वे एवं तकनीकी निरीक्षण",
      step3_title: "आपकी आवश्यकता के अनुसार डिज़ाइन",
      step4_title: "सरकारी अनुमतियाँ एवं स्वीकृतियाँ",
      step5_title: "स्ट्रक्चर एवं सोलर पैनल इंस्टॉलेशन",
      step6_title: "सिस्टम चालू करना एवं नेट मीटरिंग",

      step1_badge: "चरण 01 | प्रक्रिया का पहला चरण",
      step1_heading: "परामर्श एवं व्यवहार्यता मूल्यांकन",
      step1_desc: "हम आपकी बिजली की खपत, छत की उपयुक्तता और संभावित बचत का विस्तृत मूल्यांकन करते हैं, ताकि आपके लिए सबसे उपयुक्त सोलर समाधान तैयार किया जा सके।",
      step1_points: [
        "पिछले 12 महीनों के बिजली बिलों का विश्लेषण",
        "संभावित बचत और निवेश वापसी (ROI) का अनुमान",
        "वित्तीय विकल्पों एवं सरकारी सब्सिडी की पात्रता की जाँच"
      ],

      step2_badge: "चरण 02 | प्रक्रिया का दूसरा चरण",
      step2_heading: "साइट सर्वे एवं तकनीकी निरीक्षण",
      step2_desc: "हमारी विशेषज्ञ टीम आपकी छत का निरीक्षण करती है ताकि सोलर सिस्टम की क्षमता, सुरक्षा और सही इंस्टॉलेशन सुनिश्चित किया जा सके।",
      step2_points: [
        "ड्रोन एवं तकनीकी निरीक्षण द्वारा छत का मूल्यांकन",
        "छत की मजबूती और भार वहन क्षमता की जाँच",
        "सोलर पैनलों के लिए सर्वोत्तम स्थान का चयन"
      ],

      step3_badge: "चरण 03 | प्रक्रिया का तीसरा चरण",
      step3_heading: "आपकी आवश्यकता के अनुसार सोलर सिस्टम डिज़ाइन",
      step3_desc: "आपकी बिजली की आवश्यकता और उपलब्ध स्थान के अनुसार एक कस्टम सोलर सिस्टम डिज़ाइन तैयार किया जाता है।",
      step3_points: [
        "3D डिज़ाइन एवं लेआउट तैयार करना",
        "अधिकतम बिजली उत्पादन हेतु पैनलों की सही व्यवस्था",
        "संरचना की मजबूती और सुरक्षा का परीक्षण"
      ],

      step4_badge: "चरण 04 | प्रक्रिया का चौथा चरण",
      step4_heading: "सरकारी अनुमतियाँ एवं स्वीकृतियाँ",
      step4_desc: "सरकारी विभागों और बिजली वितरण कंपनी (DISCOM) से आवश्यक अनुमतियों की पूरी प्रक्रिया हमारी टीम संभालती है।",
      step4_points: [
        "DISCOM में आवश्यक आवेदन जमा करना",
        "सरकारी सब्सिडी के लिए आवेदन प्रक्रिया",
        "सभी तकनीकी एवं नियामकीय स्वीकृतियाँ प्राप्त करना"
      ],

      step5_badge: "चरण 05 | प्रक्रिया का पाँचवाँ चरण",
      step5_heading: "सोलर सिस्टम इंस्टॉलेशन",
      step5_desc: "अनुभवी इंजीनियरों द्वारा सुरक्षित और उच्च गुणवत्ता मानकों के साथ सोलर सिस्टम स्थापित किया जाता है।",
      step5_points: [
        "मजबूत एवं सुरक्षित माउंटिंग स्ट्रक्चर तैयार करना",
        "Tier-1 गुणवत्ता वाले सोलर पैनलों की स्थापना",
        "वायरिंग, इन्वर्टर और सुरक्षा उपकरणों का इंस्टॉलेशन"
      ],

      step6_badge: "चरण 06 | प्रक्रिया का अंतिम चरण",
      step6_heading: "टेस्टिंग, चालू करना एवं नेट मीटरिंग",
      step6_desc: "इंस्टॉलेशन के बाद सिस्टम की पूरी जाँच कर उसे चालू किया जाता है तथा नेट मीटरिंग की प्रक्रिया पूरी की जाती है।",
      step6_points: [
        "सुरक्षा एवं गुणवत्ता की अंतिम जाँच",
        "नेट मीटर की स्थापना एवं सक्रिय करना",
        "सिस्टम मॉनिटरिंग एवं मोबाइल ऐप से कनेक्ट करना"
      ],

      right_quality: "उच्च गुणवत्ता मानक",
      right_certified: "प्रमाणित इंस्टॉलेशन",
      right_compliance: "सभी मानकों का पूर्ण पालन",
    },
    faqs: {
      badge: "सोलर जानकारी केंद्र",
      heading: "अक्सर पूछे जाने वाले प्रश्न",
      description: "रूफटॉप सोलर, नेट मीटरिंग, सरकारी सब्सिडी और इंस्टॉलेशन से जुड़े सभी सामान्य प्रश्नों के स्पष्ट और आसान उत्तर यहाँ प्राप्त करें।",
      small_label: "लोकप्रिय सोलर मार्गदर्शिका",
    },
    contact: {
      badge: "हमसे संपर्क करें",
      heading: "हमारे सोलर विशेषज्ञों से जुड़ें",
      description: "यदि आपको नया सोलर सिस्टम लगवाना है, कोई विशेष आवश्यकता है या इंस्टॉलेशन एवं सर्विस से जुड़ा कोई प्रश्न है, तो नीचे दिया गया फॉर्म भरें। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
    },
    footer: {
      description: "Ashonika Green Energy एक विश्वसनीय एवं प्रमाणित सोलर EPC कंपनी है, जो घरों, व्यवसायों, संस्थानों और औद्योगिक परियोजनाओं के लिए उच्च गुणवत्ता वाले सोलर समाधान प्रदान करती है। हमारी विशेषज्ञता में सोलर सिस्टम की डिज़ाइनिंग, इंस्टॉलेशन, नेट मीटरिंग, सरकारी सब्सिडी सहायता तथा दीर्घकालीन तकनीकी सहयोग शामिल है।",
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language');
      if (stored === 'en' || stored === 'hi') return stored as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const t = (section: string, key: string, fallback?: string): string => {
    const value = translations[language]?.[section]?.[key];
    if (value !== undefined) {
      return value;
    }
    // Fallback to English, then final fallback
    const engValue = translations['en']?.[section]?.[key];
    return engValue !== undefined ? engValue : (fallback || `${section}.${key}`);
  };

  const tArray = (section: string, key: string): string[] => {
    const value = translations[language]?.[section]?.[key];
    if (Array.isArray(value)) {
      return value;
    }
    const engValue = translations['en']?.[section]?.[key];
    return Array.isArray(engValue) ? engValue : [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
