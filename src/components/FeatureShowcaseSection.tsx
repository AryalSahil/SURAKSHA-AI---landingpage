import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Languages, 
  BookOpen, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';
import { FEATURES } from '../data/content';

export const FeatureShowcaseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-indigo-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'Languages': return <Languages className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-teal-600" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-rose-600" />;
      default: return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
            Comprehensive Defense
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built to Protect Every Citizen.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Combining heuristic pattern analysis with straightforward, non-technical explanations that anyone can understand in seconds.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#F8FAFC] rounded-2xl p-7 border border-slate-200 shadow-xs hover:shadow-md card-hover flex flex-col justify-between transition-all"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs mb-5">
                  {getIcon(feature.iconName)}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Feature Tag */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{feature.badge}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
