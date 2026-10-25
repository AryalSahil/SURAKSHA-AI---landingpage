import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Shield, 
  Info, 
  AlertTriangle, 
  Copy, 
  Check, 
  ChevronRight,
  Wifi,
  Signal,
  Battery
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/content';

interface HeroSectionProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenDownload: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang, onLanguageChange, onOpenDownload }) => {
  const t = UI_TRANSLATIONS[currentLang];
  const [copied, setCopied] = useState(false);
  const [phoneLang, setPhoneLang] = useState<'EN' | 'HI' | 'AS'>('EN');

  const sampleScamMsg = "Dear candidate, you have been selected for Amazon Data Entry Job (Work from Home). Daily payout ₹2,500. Pay ₹499 registration fee to activate ID immediately on GPay: 9876543210. Limited slots!";

  const handleCopySample = () => {
    navigator.clipboard?.writeText(sampleScamMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const heroScreens = [
    {
      id: 'home',
      label: 'Home Screen',
      image: '/assets/aistudio/1_d119df8b.png',
      caption: 'Instant 1930 emergency banner & scam scanners'
    },
    {
      id: 'checker',
      label: 'Scam Checker',
      image: '/assets/aistudio/2_d9966f44.png',
      caption: 'Multi-signal text, link & screenshot analyzer'
    },
    {
      id: 'simulator',
      label: 'Scam Simulator',
      image: '/assets/aistudio/3_7968c8d0.png',
      caption: 'Interactive fictional training modules'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F5F8FC] via-[#EDF3FA] to-[#F5F8FC] border-b border-slate-200/70">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Logo + Kicker Badge */}
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png" 
                alt="SURAKSHA AI Official Seal" 
                className="w-12 h-12 object-contain rounded-2xl bg-white p-1 border border-slate-200 shadow-sm"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.heroBadge}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              {t.heroHeadline}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {t.heroSubheadline}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#download"
                onClick={onOpenDownload}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#123B70] hover:bg-[#0e2d56] text-white text-base font-semibold shadow-md hover:shadow-lg transition-all transform active:scale-98"
              >
                {/* Clean Android SVG Logo */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.4128 13.8533 8.0818 12 8.0818c-1.8535 0-3.5905.331-5.1368.868L4.841 5.4468a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.152 1.5676l1.9972 3.4592C2.6889 12.1867.5 16.0353.5 20.4545h23c0-4.4192-2.189-8.2678-5.6185-11.1331"/>
                </svg>
                <span>{t.downloadAndroid}</span>
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-base font-semibold shadow-xs hover:shadow-sm transition-all"
              >
                <span>{t.exploreFeatures}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>

            {/* Concise Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.trustSimple}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t.trustLangs}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{t.trustSteps}</span>
              </div>
            </div>

            {/* Discreet Disclaimer Note */}
            <div className="flex items-start gap-2 pt-1 text-slate-500 text-xs">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <p>{t.heroDisclaimer}</p>
            </div>

          </div>

          {/* Right Column: Realistic Android Smartphone Mockup with Real App Screen */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            
            {/* Screen switcher tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-xs mb-3 text-xs">
              {heroScreens.map((screen, idx) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeScreenIndex === idx
                      ? 'bg-[#123B70] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {screen.label}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-[340px]">
              
              {/* Outer Phone Shell (Hardware Frame) */}
              <div className="relative bg-[#0F172A] p-2.5 sm:p-3 rounded-[46px] shadow-2xl border-[4px] border-slate-700/80 phone-shadow">
                
                {/* Front speaker ear piece slit */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-600 rounded-full z-30" />
                {/* Front Camera Punchhole */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full border border-slate-800 z-30 flex items-center justify-center">
                  <div className="w-1 h-1 bg-blue-900 rounded-full opacity-60" />
                </div>

                {/* Inner Screen Display showing Real App Mockup Screenshot */}
                <div className="relative bg-white rounded-[36px] overflow-hidden border border-slate-200 text-slate-800 select-none aspect-[9/19.5]">
                  <img
                    src={heroScreens[activeScreenIndex].image}
                    alt={heroScreens[activeScreenIndex].label}
                    className="w-full h-full object-cover object-top transition-opacity duration-300"
                  />
                </div>

              </div>

              {/* Decorative Floating Label with Logo */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Android Build Showcase</span>
              </div>

            </div>

            {/* Small Caption below phone */}
            <p className="text-xs text-slate-500 mt-5 text-center lg:text-right max-w-xs">
              {heroScreens[activeScreenIndex].caption}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};
