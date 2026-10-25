import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  ExternalLink, 
  Maximize2, 
  X,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Search,
  BookOpen
} from 'lucide-react';

export const AppPreviewSection: React.FC = () => {
  const [selectedModalImage, setSelectedModalImage] = useState<{ title: string; subtitle?: string; image: string; caption: string } | null>(null);

  const appScreens = [
    {
      id: 'home',
      title: 'Home & Emergency Hub',
      subtitle: 'Citizen Cyber Defense Utility',
      image: '/assets/aistudio/1_d119df8b.png',
      tag: 'Core Dashboard',
      caption: 'Direct 1930 hotline response banner, instant SMS and Link scanners, and interactive simulation training hub.'
    },
    {
      id: 'checker',
      title: 'Scam Threat Checker',
      subtitle: 'Multi-Signal Heuristic Analysis',
      image: '/assets/aistudio/2_d9966f44.png',
      tag: 'Threat Engine',
      caption: 'Supports Message/Text, Website URL, and Screenshot inspection with Hindi & Assamese language switching.'
    },
    {
      id: 'report',
      title: 'Incident Response & 1930',
      subtitle: '4-Step Emergency Protocol',
      image: '/assets/aistudio/5_a0efba2a.png',
      tag: 'Emergency Protocol',
      caption: 'Immediate emergency protocol to secure accounts, contact bank helplines, and prevent secondary extortion.'
    },
    {
      id: 'simulator',
      title: 'Scam Conversation Simulator',
      subtitle: 'Interactive Fictional Scenarios',
      image: '/assets/aistudio/3_7968c8d0.png',
      tag: 'Hands-on Practice',
      caption: 'Safe fictional chat simulator teaching citizens how to identify deceptive recruitment, banking, and UPI traps.'
    },
    {
      id: 'lessons',
      title: 'Fraud Prevention Lessons',
      subtitle: 'Citizen Cyber Curriculum',
      image: '/assets/aistudio/4_8fe29bc7.png',
      tag: 'Knowledge Base',
      caption: 'Structured micro-modules explaining how UPI collect requests, OTP theft, and fake loan apps operate.'
    }
  ];

  // We display the marquee 3 primary screens side-by-side, plus an expandable drawer/gallery
  const primaryScreens = [appScreens[0], appScreens[1], appScreens[2]];
  const secondaryScreens = [appScreens[3], appScreens[4]];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
            Authentic Application Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple Enough for Everyone.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Engineered for intuitive ease so that parents, students, and elders can operate with complete confidence. Here is the actual SURAKSHA AI client interface.
          </p>
        </div>

        {/* 3 Primary Smartphone Hardware Mockups Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {primaryScreens.map((screen, idx) => (
            <div key={screen.id} className="flex flex-col items-center group">
              
              {/* Android Phone Hardware Shell */}
              <div className="relative w-full max-w-[310px] bg-[#0F172A] p-2.5 rounded-[42px] shadow-xl border-[3.5px] border-slate-700/80 phone-shadow transition-transform duration-300 group-hover:-translate-y-2">
                
                {/* Speaker slit & Camera */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-600 rounded-full z-20" />
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full border border-slate-800 z-20" />

                {/* Real Screen Display with Image */}
                <div className="relative bg-slate-100 rounded-[34px] overflow-hidden border border-slate-300/80 aspect-[9/19.5] select-none">
                  <img
                    src={screen.image}
                    alt={screen.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      onClick={() => setSelectedModalImage(screen)}
                      className="px-3.5 py-2 bg-white/95 text-slate-900 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-white transition-all transform scale-95 group-hover:scale-100"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Inspect Fullscreen</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Caption & Metadata below each phone */}
              <div className="mt-5 text-center max-w-[280px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                    {screen.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {idx + 1}. {screen.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {screen.caption}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Secondary Screens Banner (Simulator & Lessons) */}
        <div className="bg-[#F8FAFC] rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                Additional In-App Modules
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Cyber Awareness Simulations & Citizen Curriculum
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Included in the free Android APK distribution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryScreens.map((screen) => (
              <div 
                key={screen.id}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-5 hover:border-blue-300 transition-colors"
              >
                {/* Mini Phone Preview */}
                <div 
                  onClick={() => setSelectedModalImage(screen)}
                  className="w-32 shrink-0 bg-[#0F172A] p-1.5 rounded-[22px] border-2 border-slate-700 shadow-md cursor-pointer group/mini"
                >
                  <div className="rounded-[16px] overflow-hidden aspect-[9/19.5] relative">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-cover object-top group-hover/mini:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover/mini:opacity-100 flex items-center justify-center transition-opacity">
                      <Maximize2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Screen Content Details */}
                <div className="space-y-2 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60 inline-block">
                    {screen.tag}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {screen.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {screen.caption}
                  </p>
                  <button
                    onClick={() => setSelectedModalImage(screen)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 pt-1"
                  >
                    <span>View high-resolution mockup &rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* High-Resolution Screen Zoom Modal */}
      {selectedModalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedModalImage.title}
                </h3>
                <p className="text-xs text-slate-500">{selectedModalImage.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedModalImage(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Screen Frame */}
            <div className="py-4 flex-1 overflow-y-auto flex justify-center">
              <div className="bg-[#0F172A] p-2 rounded-[36px] border-[3px] border-slate-700 shadow-xl max-w-[280px]">
                <div className="rounded-[28px] overflow-hidden border border-slate-300 aspect-[9/19.5]">
                  <img
                    src={selectedModalImage.image}
                    alt={selectedModalImage.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 text-center pt-2 border-t border-slate-100">
              {selectedModalImage.caption}
            </p>

          </div>
        </div>
      )}

    </section>
  );
};
