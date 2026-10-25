import React from 'react';
import { ShieldCheck, Target, Heart, CheckCircle2, Code2 } from 'lucide-react';

export const AboutProjectSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F5F8FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Purpose & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Mission & Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Technology With a Purpose.
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              SURAKSHA AI is a citizen-focused digital safety initiative developed for a national hackathon to help everyday Indians recognize online scam warning signs, make informed decisions, and navigate the expanding digital economy safely.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No hidden fees, no subscriptions, and digital safety accessible to everyone. Engineered to operate performantly even on low-cost, lightweight smartphones used widely across urban and rural communities.
            </p>

            {/* Public Good Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="font-extrabold text-xl text-slate-900">100% Free</div>
                <div className="text-xs text-slate-500 mt-0.5">Public good hackathon initiative</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <div className="font-extrabold text-xl text-slate-900">Zero Storage</div>
                <div className="text-xs text-slate-500 mt-0.5">No personal message logging</div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Mission Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <img
                  src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png"
                  alt="SURAKSHA AI Logo"
                  className="w-12 h-12 object-contain rounded-xl p-0.5 border border-slate-200/90 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Project Mission</h3>
                  <span className="text-xs text-blue-600 font-medium">Digital Safety & Cyber Fraud Awareness</span>
                </div>
              </div>

              <blockquote className="text-slate-800 text-sm sm:text-base italic leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                “Making digital safety easier to understand, more accessible and available in regional languages for many citizens across Bharat.”
              </blockquote>

              {/* Verified Metadata Specs Table */}
              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Initiative Category</span>
                  <span className="font-bold text-slate-800">Digital Safety & Awareness</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Core Architecture</span>
                  <span className="font-bold text-slate-800">Lightweight React & Android</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Primary Focus</span>
                  <span className="font-bold text-slate-800">Indian Citizens & Elders</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Development Phase</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Open Beta Showcase</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
