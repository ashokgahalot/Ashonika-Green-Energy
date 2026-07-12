/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, HelpCircle, FileText, Settings, Award, ArrowRight, LayoutGrid, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FaqsProps {
  onContactClick?: () => void;
  showTitle?: boolean;
  isHomePage?: boolean;
}

export default function Faqs({ onContactClick, showTitle = true, isHomePage = false }: FaqsProps) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'technical' | 'epc'>('all');
  
  // Advanced adjustable behavior states
  const [layoutMode, setLayoutMode] = useState<'list' | 'grid'>(isHomePage ? 'grid' : 'list');
  const homepageLimit = 6;

  const categories = useMemo(() => [
    { id: 'all', labelEn: 'All Questions', labelHi: 'सभी प्रश्न', icon: HelpCircle },
    { id: 'general', labelEn: 'General & Benefits', labelHi: 'सामान्य और लाभ', icon: Award },
    { id: 'technical', labelEn: 'Technical & Operations', labelHi: 'तकनीकी और संचालन', icon: Settings },
    { id: 'epc', labelEn: 'EPC & Approvals', labelHi: 'ईपीसी और स्वीकृतियां', icon: FileText },
  ] as const, []);

  const faqData = useMemo(() => [
    {
      id: 1,
      category: 'general',
      questionEn: 'Why should I install a solar power system?',
      questionHi: 'मुझे सोलर पावर सिस्टम क्यों लगवाना चाहिए?',
      answerEn: 'A solar power system helps reduce electricity bills, provides clean renewable energy, increases property value, and protects you from rising electricity costs. It is a long-term investment with excellent returns.',
      answerHi: 'एक सोलर पावर सिस्टम बिजली के बिलों को कम करने में मदद करता है, स्वच्छ नवीकरणीय ऊर्जा प्रदान करता है, संपत्ति के मूल्य को बढ़ाता है, और आपको बिजली की बढ़ती दरों से बचाता है। यह बेहतरीन रिटर्न के साथ एक दीर्घकालीन निवेश है।'
    },
    {
      id: 2,
      category: 'general',
      questionEn: 'How much can I save on my electricity bill?',
      questionHi: 'मैं अपने बिजली के बिल पर कितनी बचत कर सकता हूँ?',
      answerEn: 'Most customers save between 70% and 100% on their electricity bills depending on system size, electricity consumption, and local regulations.',
      answerHi: 'अधिकांश ग्राहक अपने बिजली बिलों पर 70% से 100% तक की बचत करते हैं, जो उनके सोलर सिस्टम के आकार, बिजली की खपत और स्थानीय नियमों पर निर्भर करता है।'
    },
    {
      id: 3,
      category: 'general',
      questionEn: 'What is the lifespan of a solar power plant?',
      questionHi: 'सोलर पावर प्लांट का जीवनकाल कितना होता है?',
      answerEn: 'Solar panels generally last 25–30 years, while inverters typically last 8–15 years depending on the brand and usage. Regular maintenance helps maximize system performance.',
      answerHi: 'सोलर पैनल आमतौर पर 25-30 वर्षों तक चलते हैं, जबकि इन्वर्टर आमतौर पर ब्रांड और उपयोग के आधार पर 8-15 वर्षों तक काम करते हैं। नियमित रखरखाव प्रदर्शन को बेहतर बनाने में मदद करता है।'
    },
    {
      id: 4,
      category: 'epc',
      questionEn: 'What is net metering?',
      questionHi: 'नेट मीटरिंग क्या है?',
      answerEn: 'Net metering is a government-approved billing system that allows you to export excess solar electricity to the utility grid and receive credits on your electricity bill.',
      answerHi: 'नेट मीटरिंग एक सरकार द्वारा स्वीकृत बिलिंग प्रणाली है जो आपको ग्रिड में अतिरिक्त सोलर बिजली भेजने की अनुमति देती है और आपको बिजली बिल में इसके लिए क्रेडिट (छूट) मिलती है।'
    },
    {
      id: 5,
      category: 'technical',
      questionEn: 'Does my area qualify for rooftop solar?',
      questionHi: 'क्या मेरा क्षेत्र रूफटॉप सोलर के लिए योग्य है?',
      answerEn: 'Most residential, commercial, and industrial buildings with a shadow-free roof are suitable for rooftop solar. Our experts conduct a free site survey to determine feasibility.',
      answerHi: 'छाया-रहित छत वाले अधिकांश आवासीय, व्यावसायिक और औद्योगिक भवन रूफटॉप सोलर के लिए उपयुक्त हैं। हमारे विशेषज्ञ व्यवहार्यता निर्धारित करने के लिए एक निःशुल्क साइट सर्वेक्षण करते हैं।'
    },
    {
      id: 6,
      category: 'technical',
      questionEn: 'How much roof space is required?',
      questionHi: 'कितने छत स्थान की आवश्यकता होती है?',
      answerEn: 'Approximately 80–100 sq. ft. of shadow-free roof area is required for every 1 kW of solar capacity.',
      answerHi: 'प्रत्येक 1 किलोवाट (kW) सोलर क्षमता के लिए लगभग 80-100 वर्ग फुट छाया-रहित छत क्षेत्र की आवश्यकता होती है।'
    },
    {
      id: 7,
      category: 'technical',
      questionEn: 'What maintenance does a solar system require?',
      questionHi: 'सोलर सिस्टम को किस रखरखाव की आवश्यकता होती है?',
      answerEn: 'Solar systems require minimal maintenance. Periodic panel cleaning and annual inspections are usually enough to ensure optimal performance.',
      answerHi: 'सोलर सिस्टम को बहुत कम रखरखाव की आवश्यकता होती है। सर्वोत्तम प्रदर्शन सुनिश्चित करने के लिए समय-समय पर पैनलों की सफाई और वार्षिक निरीक्षण ही पर्याप्त है।'
    },
    {
      id: 8,
      category: 'technical',
      questionEn: 'What happens during cloudy or rainy days?',
      questionHi: 'बादल या बारिश के दिनों में क्या होता है?',
      answerEn: 'Solar panels continue generating electricity during cloudy weather, although at reduced efficiency. If you have a grid-connected system, electricity is automatically drawn from the grid whenever solar generation is insufficient.',
      answerHi: 'बादलों या बारिश के दिनों में भी सोलर पैनल बिजली बनाना जारी रखते हैं, हालांकि दक्षता थोड़ी कम हो जाती है। यदि आपके पास ग्रिड-कनेक्टेड सिस्टम है, तो सोलर जनरेशन अपर्याप्त होने पर ग्रिड से बिजली स्वतः मिल जाती है।'
    },
    {
      id: 9,
      category: 'technical',
      questionEn: 'Will solar panels work during a power cut?',
      questionHi: 'क्या बिजली कटौती के दौरान सोलर पैनल काम करेंगे?',
      answerEn: 'Standard grid-connected solar systems automatically shut down during a power outage for safety reasons. If uninterrupted power is required, battery backup or hybrid solar systems can be installed.',
      answerHi: 'सुरक्षा कारणों से ग्रिड-कनेक्टेड (On-Grid) सोलर सिस्टम बिजली कटौती के दौरान स्वतः बंद हो जाते हैं। यदि आपको निर्बाध बिजली की आवश्यकता है, तो बैटरी बैकअप या हाइब्रिड सोलर सिस्टम स्थापित किया जा सकता है।'
    },
    {
      id: 10,
      category: 'epc',
      questionEn: 'How long does installation take?',
      questionHi: 'स्थापना (Installation) में कितना समय लगता है?',
      answerEn: 'Most residential installations are completed within 2–5 days, while larger commercial and industrial projects may take longer depending on project size.',
      answerHi: 'अधिकांश आवासीय इंस्टॉलेशन 2-5 दिनों के भीतर पूरे हो जाते हैं, जबकि बड़े व्यावसायिक और औद्योगिक प्रोजेक्ट्स में उनके आकार के आधार पर अधिक समय लग सकता है।'
    },
    {
      id: 11,
      category: 'epc',
      questionEn: 'Do you provide complete EPC services?',
      questionHi: 'क्या आप संपूर्ण ईपीसी (EPC) सेवाएं प्रदान करते हैं?',
      answerEn: 'Yes. We offer complete Engineering, Procurement, and Construction (EPC) services, including site survey, system design, approvals, installation, testing, commissioning, and maintenance.',
      answerHi: 'हाँ। हम साइट सर्वे, सिस्टम डिजाइन, सरकारी स्वीकृतियाँ, इंस्टॉलेशन, टेस्टिंग, कमीशनिंग और रखरखाव सहित संपूर्ण इंजीनियरिंग, प्रोक्योरमेंट और कंस्ट्रक्शन (EPC) सेवाएं प्रदान करते हैं।'
    },
    {
      id: 12,
      category: 'epc',
      questionEn: 'Do you assist with government approvals and net metering?',
      questionHi: 'क्या आप सरकारी स्वीकृतियों और नेट मीटरिंग में सहायता करते हैं?',
      answerEn: 'Yes. We handle the complete documentation and coordination required for utility approvals, net metering applications, and commissioning.',
      answerHi: 'हाँ। हम बिजली वितरण कंपनी (DISCOM) की स्वीकृतियों, नेट मीटरिंग आवेदनों और कमीशनिंग के लिए आवश्यक संपूर्ण दस्तावेज़ीकरण और समन्वय को संभालते हैं।'
    },
    {
      id: 13,
      category: 'general',
      questionEn: 'Is solar a good investment for businesses?',
      questionHi: 'क्या व्यवसायों के लिए सोलर एक अच्छा निवेश है?',
      answerEn: 'Yes. Commercial and industrial customers can significantly reduce operating costs while improving sustainability and achieving faster return on investment.',
      answerHi: 'हाँ। व्यावसायिक और औद्योगिक ग्राहक ऑपरेटिंग खर्चों को महत्वपूर्ण रूप से कम कर सकते हैं, पर्यावरण संरक्षण में योगदान दे सकते हैं और बहुत तेज़ी से निवेश वापस प्राप्त कर सकते हैं।'
    },
    {
      id: 14,
      category: 'epc',
      questionEn: 'Do you provide Annual Maintenance Contracts (AMC)?',
      questionHi: 'क्या आप वार्षिक रखरखाव अनुबंध (AMC) प्रदान करते हैं?',
      answerEn: 'Yes. We offer comprehensive AMC services including preventive maintenance, system health checks, performance monitoring, inverter servicing, and prompt technical support.',
      answerHi: 'हाँ। हम प्रिवेंटिव मेंटेनेंस, सिस्टम हेल्थ चेक, परफॉर्मेंस मॉनिटरिंग, इन्वर्टर सर्विसिंग और त्वरित तकनीकी सहायता सहित व्यापक वार्षिक रखरखाव अनुबंध (AMC) सेवाएं प्रदान करते हैं।'
    },
    {
      id: 15,
      category: 'technical',
      questionEn: 'Can I monitor my solar system remotely?',
      questionHi: 'क्या मैं अपने सोलर सिस्टम की दूरस्थ रूप से (Remotely) निगरानी कर सकता हूँ?',
      answerEn: 'Yes. Most modern solar inverters include a mobile app or web portal that allows you to monitor power generation, energy savings, and system performance in real time.',
      answerHi: 'हाँ। अधिकांश आधुनिक सोलर इनवर्टर में मोबाइल ऐप या वेब पोर्टल की सुविधा होती है, जो आपको वास्तविक समय (Real-time) में बिजली उत्पादन, बचत और सिस्टम के प्रदर्शन की निगरानी करने की अनुमति देता है।'
    },
    {
      id: 16,
      category: 'epc',
      questionEn: 'Which type of solar system should I choose?',
      questionHi: 'मुझे किस प्रकार का सोलर सिस्टम चुनना चाहिए?',
      answerEn: 'The right system depends on your energy needs:\n\n• On-Grid: Best for reducing electricity bills.\n• Off-Grid: Suitable for areas without reliable grid power.\n• Hybrid: Combines grid connectivity with battery backup.',
      answerHi: 'सही सोलर सिस्टम आपकी बिजली की जरूरतों पर निर्भर करता है:\n\n• On-Grid: बिजली बिल कम करने के लिए सबसे बेहतर।\n• Off-Grid: ग्रिड बिजली के बिना वाले क्षेत्रों के लिए उपयुक्त।\n• Hybrid: ग्रिड कनेक्टिविटी और बैटरी बैकअप दोनों का संयोजन।'
    },
    {
      id: 17,
      category: 'general',
      questionEn: 'Do you offer customized solar solutions?',
      questionHi: 'क्या आप अनुकूलित (Customized) सोलर समाधान प्रदान करते हैं?',
      answerEn: 'Yes. Every project is designed based on your electricity consumption, roof space, budget, and future energy requirements.',
      answerHi: 'हाँ। प्रत्येक परियोजना को आपकी बिजली की खपत, उपलब्ध छत स्थान, बजट और भविष्य की ऊर्जा आवश्यकताओं के आधार पर अनुकूलित (Customized) किया जाता है।'
    },
    {
      id: 18,
      category: 'general',
      questionEn: 'Why choose Ashonika Green Energy?',
      questionHi: 'आशोनिका ग्रीन एनर्जी को क्यों चुनें?',
      answerEn: 'We provide end-to-end solar EPC solutions backed by experienced engineers, quality components, professional installation, transparent pricing, and reliable after-sales support. Our goal is to deliver efficient, safe, and long-lasting solar solutions tailored to each customer\'s needs.',
      answerHi: 'हम अनुभवी इंजीनियरों, गुणवत्तापूर्ण उपकरणों, पेशेवर इंस्टॉलेशन, पारदर्शी मूल्य निर्धारण और विश्वसनीय बिक्री के बाद सेवा द्वारा समर्थित संपूर्ण सोलर EPC समाधान प्रदान करते हैं। हमारा लक्ष्य प्रत्येक ग्राहक की जरूरतों के अनुसार कुशल, सुरक्षित और दीर्घकालिक सोलर समाधान प्रदान करना है।'
    }
  ], []);

  // Filter & Search Logic
  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const questionText = language === 'en' ? faq.questionEn : faq.questionHi;
      const answerText = language === 'en' ? faq.answerEn : faq.answerHi;
      const matchesSearch =
        questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        answerText.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqData, activeCategory, searchQuery, language]);

  // Handle limits for the home page vs the standalone page
  const visibleFaqs = useMemo(() => {
    return isHomePage ? filteredFaqs.slice(0, homepageLimit) : filteredFaqs;
  }, [filteredFaqs, isHomePage]);

  // Split visible FAQs for a beautiful balanced grid layout
  const leftColFaqs = useMemo(() => {
    return visibleFaqs.filter((_, idx) => idx % 2 === 0);
  }, [visibleFaqs]);

  const rightColFaqs = useMemo(() => {
    return visibleFaqs.filter((_, idx) => idx % 2 === 1);
  }, [visibleFaqs]);

  const handleCategoryChange = (catId: 'all' | 'general' | 'technical' | 'epc') => {
    setActiveCategory(catId);
  };

  return (
    <section id="faqs-component-wrapper" className="w-full py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {showTitle && (
          <div className="text-center space-y-4 mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/15 text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase select-none">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('faqs', 'badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              {language === 'en' ? (
                <>Frequently Asked <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Questions</span></>
              ) : (
                <>अक्सर पूछे जाने वाले <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">प्रश्न</span></>
              )}
            </h2>
            <p className="text-slate-600 dark:text-slate-350 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t('faqs', 'description')}
            </p>
          </div>
        )}

        {!isHomePage && (
          <>
            {/* Dynamic Search Bar */}
            <div className="relative max-w-xl mx-auto mb-10">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={language === 'en' ? "Search solar FAQs..." : "प्रश्नों में खोजें..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 inset-y-0 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Clear' : 'साफ़ करें'}
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const label = language === 'en' ? cat.labelEn : cat.labelHi;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="faqTabPill"
                        className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/10 dark:border-emerald-400/20 rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Adjustable Controls Panel for Layout & Behavior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100 dark:border-slate-900 max-w-6xl mx-auto">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {isHomePage ? (language === 'en' ? "Popular Solar Guides" : "लोकप्रिय सोलर मार्गदर्शिका") : (language === 'en' ? "Solar Knowledge Base" : "सोलर जानकारी केंद्र")} 
            <span className="ml-1.5 font-normal text-slate-450 dark:text-slate-500 text-[11px] lowercase">
              ({visibleFaqs.length} {language === 'en' ? 'of' : 'में से'} {filteredFaqs.length} {language === 'en' ? 'items shown' : 'प्रश्न दिखाए गए हैं'})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Responsive Layout Toggle */}
            <div className="flex items-center bg-slate-100/80 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  layoutMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-emerald-655 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-450 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="Single Column Stacked Layout"
              >
                <LayoutList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-emerald-655 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-450 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
                title="Two-Column Balanced Grid Layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Adjustable FAQ List Container with statically open layout (No accordions) */}
        <div className="w-full relative min-h-[120px]">
          <AnimatePresence mode="popLayout">
            {visibleFaqs.length > 0 ? (
              layoutMode === 'grid' ? (
                // Beautiful balanced two-column staggered grid layout (No accordions)
                <div key="grid-layout" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="flex flex-col gap-6">
                    {leftColFaqs.map((faq) => (
                      <FaqCard key={faq.id} faq={faq} language={language} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-6">
                    {rightColFaqs.map((faq) => (
                      <FaqCard key={faq.id} faq={faq} language={language} />
                    ))}
                  </div>
                </div>
              ) : (
                // Centered single-column elegant list layout (No accordions)
                <div key="list-layout" className="max-w-3xl mx-auto flex flex-col gap-6">
                  {visibleFaqs.map((faq) => (
                    <FaqCard key={faq.id} faq={faq} language={language} />
                  ))}
                </div>
              )
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-slate-500 dark:text-slate-400 space-y-3 max-w-md mx-auto"
              >
                <HelpCircle className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-750 animate-pulse" />
                <p className="text-base font-bold text-slate-800 dark:text-slate-200">
                  {language === 'en' ? 'No questions found' : 'कोई प्रश्न नहीं मिला'}
                </p>
                <p className="text-xs text-slate-550 dark:text-slate-400">
                  {language === 'en' 
                    ? 'Try adjusting your search terms or select another category at the top of the knowledge base.'
                    : 'कृपया अपनी खोज का शब्द बदलें या ऊपर दी गई श्रेणियों में से कोई अन्य श्रेणी चुनें।'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Show All FAQs Navigation Button */}
        {isHomePage && (
          <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/faqs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-900/10 hover:shadow-lg hover:shadow-emerald-900/20 active:scale-95 cursor-pointer"
            >
              <span>{language === 'en' ? 'Show All FAQs' : 'सभी सामान्य प्रश्न देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Request Custom Consultation button links to Contact Form */}
        {!isHomePage && (
          <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-150 dark:border-slate-900/80">
            <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 mb-1">
              {language === 'en' ? 'Still have questions about Rooftop Solar?' : 'रूफटॉप सोलर को लेकर अभी भी कोई सवाल है?'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              {language === 'en' 
                ? 'Our professional certified engineering team is available for a direct customized technical consultation.'
                : 'हमारी अनुभवी और प्रमाणित इंजीनियर्स की टीम आपके लिए व्यक्तिगत परामर्श के लिए सदैव उपलब्ध है।'}
            </p>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-400 hover:text-emerald-650 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
              >
                <span>{language === 'en' ? 'Request Custom Consultation' : 'निःशुल्क सोलर परामर्श प्राप्त करें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

interface FaqCardProps {
  key?: React.Key;
  faq: { id: number; category: string; questionEn: string; questionHi: string; answerEn: string; answerHi: string };
  language: 'en' | 'hi';
}

/**
 * Beautiful, Statically Open FAQ Card (No Collapsible states, No Accordions)
 */
function FaqCard({ faq, language }: FaqCardProps) {
  const question = language === 'en' ? faq.questionEn : faq.questionHi;
  const answer = language === 'en' ? faq.answerEn : faq.answerHi;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10 shadow-xs flex flex-col gap-3 group hover:border-emerald-500/30 hover:bg-white dark:hover:bg-slate-900/30 transition-all duration-300"
    >
      <div className="flex gap-3 items-start">
        <span className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-black font-mono shrink-0 select-none">
          Q
        </span>
        <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
          {question}
        </h4>
      </div>
      <div className="pl-9 text-xs md:text-sm text-slate-600 dark:text-slate-350 leading-relaxed whitespace-pre-line border-l-2 border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
        {answer}
      </div>
    </motion.div>
  );
}
