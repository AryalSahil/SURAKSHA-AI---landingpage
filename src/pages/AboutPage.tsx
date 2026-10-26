import React from 'react';
import { ShieldCheck, Target, Heart, Lock, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Digital Safety & Cyber Fraud Awareness</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Technology With a Purpose.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            SURAKSHA AI was conceived as an open citizen digital safety initiative built for a national cybersecurity hackathon to protect everyday Indians from predatory online fraud.
          </p>
        </div>

        {/* Narrative & Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-100">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                The Core Problem We Are Addressing
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As millions of first-time internet users, senior citizens, and students embrace digital payments across India, cyber fraud syndicates increasingly deploy psychological urgency tactics: fake work-from-home deposits, electricity disconnection threats, and counterfeit UPI collect requests.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most existing cybersecurity tools are built for enterprise SOC teams or use complex English jargon. SURAKSHA AI democratizes cyber protection into plain, understandable vernacular languages.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <img
                src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png"
                alt="SURAKSHA AI Logo"
                className="w-16 h-16 object-contain mx-auto mb-2"
              />
              <div className="font-extrabold text-slate-900 text-sm">SURAKSHA AI</div>
              <div className="text-xs text-blue-600 font-semibold">Hackathon Submission 2026</div>
              <div className="text-[11px] text-slate-500">Citizen Cyber Defense Utility</div>
            </div>
          </div>

          {/* Mission Quote */}
          <blockquote className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200/80 text-slate-800 text-sm sm:text-base italic leading-relaxed text-center">
            “Making digital safety easier to understand, more accessible, and available in regional languages for every citizen across Bharat.”
          </blockquote>

          {/* 3 Core Ethical Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-sm font-bold text-slate-900">100% Free Public Good</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero paywalls, no hidden subscription fees, and no monetization of citizen security inquiries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-sm font-bold text-slate-900">Strict Zero Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We never store personal SMS logs, contact books, or netbanking credentials on any remote server.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-sm font-bold text-slate-900">Complements Law Enforcement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                SURAKSHA AI offers educational guidance and refers citizens directly to India's 1930 Cyber Helpline and cybercrime.gov.in.
              </p>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Verified Technical Profile:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Category</span>
                <span className="font-bold text-slate-800">Cyber Fraud Awareness</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Target OS</span>
                <span className="font-bold text-slate-800">Android 8.0 & Above</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Supported Vernaculars</span>
                <span className="font-bold text-slate-800">English, Hindi, Assamese</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Project Status</span>
                <span className="font-bold text-emerald-700">Open Beta Showcase</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
