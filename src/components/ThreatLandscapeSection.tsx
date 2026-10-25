import React from 'react';
import { 
  Briefcase, 
  CreditCard, 
  Send, 
  Globe, 
  Headphones, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { THREAT_CATEGORIES } from '../data/content';

export const ThreatLandscapeSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'ShieldAlert': return <Send className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <section id="threats" className="py-16 sm:py-20 bg-[#F5F8FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-12">
          <span className="text-xs font-bold text-rose-600 tracking-wider uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-200/60 inline-block mb-3">
            The Real Threat Landscape
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Digital Scams Shouldn't Decide Your Future.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every day, citizens encounter deceptive messages designed to panic, confuse, or lure them into irreversible actions. SURAKSHA AI helps you spot the warning signs before any harm is done.
          </p>
        </div>

        {/* 6 Threat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THREAT_CATEGORIES.map((threat) => (
            <div
              key={threat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md card-hover flex flex-col justify-between transition-all"
            >
              <div>
                {/* Category Header with Icon & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    {getIcon(threat.iconName)}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${threat.tagColor}`}>
                    {threat.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {threat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {threat.description}
                </p>
              </div>

              {/* Bottom Subtle Tip */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Recognize the red flags</span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Analyze &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
