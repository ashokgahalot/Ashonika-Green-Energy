import React, { useState } from 'react';
import { Sun, ShieldCheck, MapPin, Award, ChevronDown, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export default function SeoContentSection() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: language === 'hi' 
        ? "किशनगढ़ और अजमेर में सबसे बेहतरीन सोलर कंपनी कौन सी है?" 
        : "Which is the best solar company in Kishangarh and Ajmer?",
      a: language === 'hi'
        ? "आशोनिका ग्रीन एनर्जी (Ashonika Green Energy) किशनगढ़, अजमेर और राजस्थान में सबसे भरोसेमंद व प्रमाणित सोलर कंपनी है। हम Tier-1 सोलर पैनल (Loom Solar, Microtek, Growatt), PM सूर्य घर योजना के तहत सरकारी सब्सिडी, त्वरित नेट-मीटरिंग और 25 साल की परफॉर्मेंस वारंटी प्रदान करते हैं।"
        : "Ashonika Green Energy is widely recognized as the top solar company and authorized solar installer in Kishangarh and Ajmer, Rajasthan. We provide Tier-1 solar panels (Loom Solar, Microtek, Growatt), PM Surya Ghar subsidy assistance, fast net-metering approvals, and 25-year performance warranties."
    },
    {
      q: language === 'hi'
        ? "राजस्थान में पीएम सूर्य घर योजना सोलर सब्सिडी कैसे प्राप्त करें?"
        : "How to get PM Surya Ghar solar subsidy in Rajasthan?",
      a: language === 'hi'
        ? "पीएम सूर्य घर मुफ्त बिजली योजना के तहत राजस्थान में 3kW तक के रूफटॉप सोलर सिस्टम पर केंद्र सरकार द्वारा ₹78,000 तक की सीधी सब्सिडी मिलती है। आशोनिका ग्रीन एनर्जी डिस्कॉम नेट-मीटरिंग अप्रूवल और पोर्टल रजिस्ट्रेशन से लेकर सब्सिडी राशि बैंक खाते में आने तक पूरी प्रक्रिया संभालती है।"
        : "Under PM Surya Ghar Muft Bijli Yojana in Rajasthan, homeowners can claim up to ₹78,000 direct central government subsidy for a 3kW rooftop solar system. Ashonika Green Energy handles complete portal registration, DISCOM net-metering approval, and subsidy disbursement guidance."
    },
    {
      q: language === 'hi'
        ? "अजमेर/किशनगढ़ में 3kW, 5kW और 10kW सोलर सिस्टम की लागत कितनी है?"
        : "What is the cost of 3kW, 5kW, and 10kW rooftop solar system in Ajmer/Kishangarh?",
      a: language === 'hi'
        ? "3kW रूफटॉप सोलर की लागत सब्सिडी से पहले लगभग ₹1.6 लाख से ₹2.1 लाख होती है (₹78,000 सब्सिडी के बाद प्रभावी लागत मात्र ₹82,000 से ₹1.32 लाख)। 5kW सिस्टम की लागत ₹2.8 लाख से ₹3.5 लाख और 10kW कमर्शियल प्लांट की लागत ₹5.2 लाख से ₹6.8 लाख होती है।"
        : "A 3kW solar system cost ranges between ₹1,60,000 - ₹2,10,000 before subsidy (effectively ₹82,000 - ₹1,32,000 after ₹78,000 subsidy). A 5kW system costs approx ₹2,80,000 - ₹3,50,000, and a 10kW commercial solar system ranges from ₹5,20,000 - ₹6,80,000 depending on panel efficiency (Bifacial/Mono PERC) and inverter configuration."
    },
    {
      q: language === 'hi'
        ? "क्या आशोनिका ग्रीन एनर्जी ऑन-ग्रिड, ऑफ-ग्रिड और हाइब्रिड सोलर सिस्टम प्रदान करती है?"
        : "Does Ashonika Green Energy offer On-Grid, Off-Grid, and Hybrid solar power plants?",
      a: language === 'hi'
        ? "हाँ, आशोनिका ग्रीन एनर्जी ऑन-ग्रिड (ग्रिड टाइड) नेट-मीटरिंग सोलर, लिथियम बैटरी बैकअप वाले ऑफ-ग्रिड सिस्टम और दोनों के संयोजन हाइब्रिड सोलर पावर प्लांट पूरे किशनगढ़, अजमेर, जयपुर और पूरे भारत में इंस्टॉल करती है।"
        : "Yes, Ashonika Green Energy installs on-grid net-metered solar systems, battery-backed off-grid systems, and hybrid solar power plants for residential, commercial, marble industry, and agricultural clients across Kishangarh, Ajmer, Rajasthan, and India."
    }
  ];

  return (
    <section id="seo-knowledge-base" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main H1 Title & Subtitle for Keyword & AI Search Optimization */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-500/20 text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'राजस्थान व भारत की प्रमुख सोलर कंपनी' : 'Leading Solar EPC & Installer in Rajasthan & India'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-tight">
            {language === 'hi' ? (
              <>
                आशोनिका ग्रीन एनर्जी - <span className="bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">किशनगढ़, अजमेर, राजस्थान व भारत</span> में बेस्ट सोलर कंपनी व सोलर पैनल इंस्टॉलर
              </>
            ) : (
              <>
                Ashonika Green Energy - <span className="bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">Best Solar Company & Solar Panel Installer</span> in Kishangarh, Ajmer, Rajasthan & India
              </>
            )}
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'hi' 
              ? "किशनगढ़, अजमेर, जयपुर और पूरे राजस्थान में अग्रणी रूफटॉप सोलर EPC कंपनी। PM सूर्य घर योजना सब्सिडी, Tier-1 सोलर पैनल (Loom Solar, Microtek, Growatt), ऑन-ग्रिड व हाइब्रिड सिस्टम के लिए आधिकारिक डीलर व इंस्टॉलर।"
              : "Premier certified solar engineering, procurement, and construction (EPC) company in Kishangarh, Ajmer, Rajasthan, and across India. Specializing in PM Surya Ghar Muft Bijli Yojana subsidies, residential rooftop solar, industrial EPC, and 25-year performance warranties."
            }
          </p>
        </div>

        {/* Structured Keyword Sections Grid (H2 & H3s) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Kishangarh & Ajmer Location Focus */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Top Solar Installer in Kishangarh & Ajmer
            </h2>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              If you are searching for the <strong>best solar company in Kishangarh</strong> or an authorized <strong>solar installer in Ajmer</strong>, Ashonika Green Energy provides end-to-end solar power solutions. From marble slurry processing plants in Madanganj-Kishangarh to residential rooftops in Pushkar, Ajmer, and Beawar, our certified solar engineers deploy high-efficiency mono PERC & bifacial solar modules.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Authorized Tier-1 Solar Panel Dealer in Kishangarh & Ajmer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rooftop Solar Installation for Homes, Schools & Marble Factories</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Local Support Center: Sarana, Magra, Kishangarh / Ajmer (305811)</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Rajasthan & Commercial EPC Focus */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Best Solar Company in Rajasthan for Rooftop & Commercial Solar
            </h2>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              Ashonika Green Energy is a leading <strong>solar EPC company in Rajasthan</strong>. We execute turnkey utility-scale solar projects, commercial rooftop arrays, and off-grid solar microgrids across Jaipur, Jodhpur, Udaipur, Kota, Bhilwara, and Sikar. Our engineering team ensures maximum sun exposure, custom elevated mounting structures, and 25-year linear power warranties.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Industrial & Commercial Solar EPC Solutions in Rajasthan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Heavy Duty Galvanized Steel Mounting Structures</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Zero-Maintenance Microtek & Growatt On-Grid Inverters</span>
              </li>
            </ul>
          </div>

          {/* Card 3: PM Surya Ghar Subsidy Focus */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              PM Surya Ghar Muft Bijli Yojana & Govt Solar Subsidy Assistance
            </h3>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              Claim up to <strong>₹78,000 central government solar subsidy</strong> under the PM Surya Ghar Muft Bijli Yojana in Rajasthan with Ashonika Green Energy. We handle complete documentation, national portal application, DISCOM net-metering inspection, and direct subsidy credit to your bank account without any hassle.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>1kW - 3kW Residential Systems: Up to ₹78,000 Subsidy</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Fast Net-Metering Approval with AVVNL / JVVNL Discoms</span>
              </li>
            </ul>
          </div>

          {/* Card 4: All India Solutions Focus */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Complete Solar Power Solutions across India (On-Grid, Off-Grid & Hybrid)
            </h3>
            <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
              Ashonika Green Energy delivers full-spectrum solar power technologies across India. Whether you need a 3kW, 5kW, or 10kW residential rooftop system, a hybrid system with lithium battery storage, or an industrial solar farm, we provide guaranteed ROI, remote monitoring, and lifetime technical support.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>3kW, 5kW, 10kW & Custom Plant Capacities</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Loom Solar, Microtek, Growatt Authorized Hardware</span>
              </li>
            </ul>
          </div>

        </div>

        {/* AI Search & User FAQ Accordion Section */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {language === 'hi' ? 'सोलर ऊर्जा संबंधित सामान्य प्रश्न (FAQ)' : 'Solar Knowledge Base & Search FAQs'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
              {language === 'hi'
                ? "सोलर पैनल इंस्टॉलेशन, पीएम सूर्य घर सब्सिडी और कीमतों के बारे में त्वरित उत्तर।"
                : "Verified insights for solar panel installation, PM Surya Ghar subsidy, costs, and solar EPC services in Kishangarh, Ajmer & Rajasthan."
              }
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-4 text-slate-600 dark:text-slate-350 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 bg-slate-50/50 dark:bg-slate-900/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
