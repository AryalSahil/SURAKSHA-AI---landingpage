import React, { useState } from 'react';
import { 
  Languages, 
  Type, 
  Eye, 
  Sliders, 
  Volume2, 
  Check, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageAccessibilitySectionProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const LanguageAccessibilitySection: React.FC<LanguageAccessibilitySectionProps> = ({ 
  currentLang, 
  onLanguageChange 
}) => {
  const [activeTab, setActiveTab] = useState<'en' | 'hi' | 'as'>('en');

  const languageSamples = [
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      badge: 'Standard',
      technicalTerm: 'Technical Flag: Malicious APK Payload Vector',
      vernacularHeadline: 'Warning: Unsolicited APK file detected.',
      vernacularExplanation: 'This message wants you to install an unknown file. Legitimate banks, electricity boards, or courier companies NEVER send installation files over WhatsApp or SMS.',
      actionGuidance: 'Delete the message and never tap "Download APK".'
    },
    {
      id: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      badge: 'क्षेत्रीय भाषा',
      technicalTerm: 'तकनीकी चेतावनी: अनधिकृत एपीके पेलोड',
      vernacularHeadline: 'चेतावनी: अनजान ऐप फ़ाइल (APK) का पता चला!',
      vernacularExplanation: 'यह संदेश आपको एक अज्ञात फ़ाइल इंस्टॉल करने को कह रहा है। असली बैंक, बिजली विभाग या डाक विभाग कभी भी WhatsApp या SMS पर ऐप फाइलें नहीं भेजते।',
      actionGuidance: 'संदेश तुरंत हटा दें और किसी भी लिंक पर क्लिक न करें।'
    },
    {
      id: 'as',
      name: 'Assamese',
      nativeName: 'অসমীয়া',
      badge: 'আঞ্চলিক ভাষা',
      technicalTerm: 'কাৰিকৰী সতৰ্কবাণী: সন্দেহজনক এপিকে ফাইল',
      vernacularHeadline: 'সতৰ্কবাণী: অপৰিচিত এপ ফাইল (APK) পোৱা গৈছে।',
      vernacularExplanation: 'এই বাৰ্তাটোৱে আপোনাক এটা অচিনাকি ফাইল ইনষ্টল কৰিবলৈ কৈছে। প্ৰকৃত বেংক, বিদ্যুৎ বিভাগ বা কুৰিয়াৰে কেতিয়াও মেছেজত এপ ফাইল ডাউনলোড কৰিবলৈ নকয়।',
      actionGuidance: 'বাৰ্তাটো ডিলিট কৰক আৰু কোনো ফাইল ডাউনলোড নকৰিব।'
    }
  ];

  return (
    <section id="languages" className="py-16 sm:py-24 bg-[#F5F8FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
            Inclusive and Adaptive
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Digital Safety in Your Language.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Cyber protection should never be blocked by language barriers. We translate complex technical warnings into regional vernaculars that anyone can understand instantly.
          </p>
        </div>

        {/* 3 Regional Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {languageSamples.map((lang) => (
            <div
              key={lang.id}
              onClick={() => {
                setActiveTab(lang.id as 'en' | 'hi' | 'as');
                onLanguageChange(lang.id as SupportedLanguage);
              }}
              className={`cursor-pointer rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                currentLang === lang.id
                  ? 'bg-white border-[#2563EB] shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div>
                    <span className="font-extrabold text-lg text-slate-900">{lang.nativeName}</span>
                    <span className="text-xs text-slate-400 ml-2">({lang.name})</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                    {lang.badge}
                  </span>
                </div>

                {/* Technical Term Tag (crossed out / converted) */}
                <div className="text-[11px] text-slate-400 font-mono mb-2 line-through">
                  {lang.technicalTerm}
                </div>

                {/* Simple Vernacular Headline */}
                <div className="flex items-start gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {lang.vernacularHeadline}
                  </h3>
                </div>

                {/* Plain-Language Explanation */}
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  "{lang.vernacularExplanation}"
                </p>
              </div>

              {/* Action guidance */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{lang.actionGuidance}</span>
                <span className="text-blue-600 font-bold flex items-center gap-1">
                  Active {currentLang === lang.id && <Check className="w-3.5 h-3.5" />}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Accessibility Pillars Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Large Readable Font</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Scalable typography with high legibility designed for elderly citizens.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">High Contrast</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  WCAG AA compliant color contrast with text-labeled safety indicators.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">One-Touch Toggles</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Swiftly toggle explanations into your native dialect without complicated settings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Screen-Reader Ready</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Strict ARIA semantics and structured headings for assistive audio software.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
