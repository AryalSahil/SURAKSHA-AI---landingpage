import React from 'react';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Terminal,
  HelpCircle
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const HowItWorksPage: React.FC = () => {
  const { navigate } = useRouter();

  const safetyWorkflow = [
    {
      step: '01',
      title: 'Citizen Input Collection',
      desc: 'You paste an SMS snippet, WhatsApp forward, suspicious web URL, or Telegram job prompt. No personal account links or phone permissions needed.',
      badge: 'Zero Permission',
    },
    {
      step: '02',
      title: 'Signal & Heuristic Triaging',
      desc: 'SURAKSHA AI checks against known fraud vectors: urgency pressure triggers, upfront registration fee patterns, raw IP domains, and spoofed bank contact headers.',
      badge: 'Multi-Signal Engine',
    },
    {
      step: '03',
      title: 'Contextual Plain-Language Report',
      desc: 'You receive an instant breakdown highlighting specific red flags in your preferred regional language (English, Hindi, Assamese).',
      badge: 'Vernacular Clarity',
    },
    {
      step: '04',
      title: 'Immediate Action Checklist',
      desc: 'Actionable steps to block sender, verify directly via bank portal, and escalate to official National Cyber Crime Helpline (1930) if money was sent.',
      badge: 'Incident Response',
    },
  ];

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
            Triage Methodology
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            How SURAKSHA AI Protects You.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From initial suspicious message to decisive, safe action in seconds. Here is how our citizen safety analysis pipeline operates.
          </p>
        </div>

        {/* 4-Step Detailed Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {safetyWorkflow.map((item) => (
            <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-blue-600/70 font-mono">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Safe Pipeline</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reuse the core Interactive Simulator component */}
        <div className="mb-20">
          <HowItWorksSection />
        </div>

        {/* Case Study Deep Dive */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block mb-3">
              Real Incident Walkthrough
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Case Analysis: The "Electricity Power Cut Tonight" Deception
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              A citizen receives an urgent SMS: <em>"Dear Consumer, power will be disconnected at 9:30 PM due to pending bill. Call officer at 98451xxxxx or install bill-pay.apk immediately."</em>
            </p>

            <div className="space-y-3 mb-8">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">1. Artificial Urgency Trap</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Giving less than 3 hours prevents the consumer from contacting the genuine electricity board customer service office.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2. Malicious APK Distribution</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Real electricity discoms operate verified web portals, never raw .apk downloads sent via SMS. The attached APK installs remote screen-mirroring malware.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">3. Safe Resolution</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    SURAKSHA AI advises the user to delete the APK, check account status only at the official state discom website, and ignore the personal 10-digit number.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="px-6 py-3 bg-[#123B70] text-white font-bold rounded-xl text-xs sm:text-sm hover:bg-blue-900 transition-colors"
              >
                Learn More Scam Scenarios
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm hover:bg-slate-200 transition-colors"
              >
                Report a New Scam Pattern
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
