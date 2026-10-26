import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Languages, 
  BookOpen, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Smartphone, 
  Layers, 
  Lock,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { useCardStaggerAnimation } from '../utils/animations';
import { useRouter } from '../context/RouterContext';

export const FeaturesPage: React.FC = () => {
  const containerRef = useCardStaggerAnimation();
  const { navigate } = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'detection' | 'vernacular' | 'action'>('all');

  const detailedFeatures = [
    {
      id: 'smart-scam-checker',
      category: 'detection',
      title: 'Smart Scam Checker',
      subtitle: 'Natural language heuristic pattern scanning',
      description:
        'Review suspicious SMS, WhatsApp forwards, email snippets, and job offers. Evaluates urgency pressure, artificial scarcity, spoofed bank sender headers, and unexpected monetary demands.',
      highlights: [
        'Recognizes fake work-from-home registration fee traps',
        'Detects unauthorized customer care mobile numbers',
        'Flags deceptive OTP extraction requests',
      ],
      icon: ShieldCheck,
      iconColor: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'suspicious-link-checker',
      category: 'detection',
      title: 'Suspicious Link Checker',
      subtitle: 'Domain typosquatting and deceptive redirect analysis',
      description:
        'Examines unverified URLs (such as sbi-kyc-update.xyz or indiapost-track.site) before you ever tap or submit confidential credentials. Unravels URL shorteners and highlights domain mismatch.',
      highlights: [
        'Detects deceptive TLD lookalikes (.xyz, .top, .site, .vip)',
        'Flags raw IP address payment links and APK download URLs',
        'Verifies official government domains (e.g. .gov.in vs clones)',
      ],
      icon: Globe,
      iconColor: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: 'clear-ai-explanations',
      category: 'detection',
      title: 'Plain-Language AI Explanations',
      subtitle: 'Clarity over confusing technical jargon',
      description:
        'Technical warnings like "malicious payload vector" or "session hijacking" confuse ordinary citizens. SURAKSHA AI explains strictly why a message is risky and what logical checks to perform next.',
      highlights: [
        'Zero-jargon plain reasoning anyone can understand in 5 seconds',
        'Specific anti-manipulation psychological cues highlighted',
        'Clear separation between facts and unverified claims',
      ],
      icon: Sparkles,
      iconColor: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'regional-language-support',
      category: 'vernacular',
      title: 'Regional Language Support',
      subtitle: 'English, हिन्दी (Hindi), and অসমীয়া (Assamese)',
      description:
        'Cyber safety must never be obstructed by language barriers. Full explanations, interface elements, and incident response checklists are natively available in regional Indian languages.',
      highlights: [
        'Culturally adapted warnings for local fraud vernaculars',
        'One-touch dialect switching directly inside the app',
        'Designed for first-time smartphone owners and rural communities',
      ],
      icon: Languages,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'learn-digital-safety',
      category: 'action',
      title: 'Citizen Cyber Curriculum',
      subtitle: 'Interactive training and simulated chat scenarios',
      description:
        'Build digital confidence through bite-sized interactive modules, real case study analyses, and interactive quizzes that test your ability to spot deceptive messages before they happen.',
      highlights: [
        'Scam conversation simulator for realistic practice',
        '10 core citizen awareness modules covering UPI, OTP & jobs',
        'Safe fictional sandbox with zero risk to personal devices',
      ],
      icon: BookOpen,
      iconColor: 'text-teal-600 bg-teal-50',
    },
    {
      id: 'fraud-reporting-guidance',
      category: 'action',
      title: 'Emergency 1930 Reporting Guide',
      subtitle: 'Actionable steps for financial fraud mitigation',
      description:
        'If a transaction has already occurred, every minute matters. Practical step-by-step guidance to freeze fraudulent recipient accounts via 1930 and preserve essential digital evidence.',
      highlights: [
        'Immediate bank fraud helpline connection guidance',
        'Preservation checklist for UTR numbers, chats & SMS',
        'Official Cyber Crime Reporting Portal (cybercrime.gov.in) workflow',
      ],
      icon: FileCheck,
      iconColor: 'text-rose-600 bg-rose-50',
    },
  ];

  const filteredFeatures = activeTab === 'all' 
    ? detailedFeatures 
    : detailedFeatures.filter(f => f.category === activeTab);

  return (
    <div className="py-12 sm:py-20 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Comprehensive Citizen Defense System</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
            Engineered to Protect Every Citizen.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            SURAKSHA AI bridges cutting-edge threat pattern recognition with crystal-clear, non-technical explanations so anyone can identify cyber hazards before acting.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Features
            </button>
            <button
              onClick={() => setActiveTab('detection')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'detection'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Detection Engine
            </button>
            <button
              onClick={() => setActiveTab('vernacular')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'vernacular'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Regional Languages
            </button>
            <button
              onClick={() => setActiveTab('action')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'action'
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Action & Response
            </button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="gsap-card bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3">
                    {feat.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {feat.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    {feat.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">No personal data logged</span>
                  <button 
                    onClick={() => navigate('/how-it-works')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>See Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Architecture Strip */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#123B70] to-[#0B192C] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800">
                Design Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Privacy-First, Local-First Architecture
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                SURAKSHA AI does not require device root access, does not read personal contacts, and never records your banking credentials. Text evaluation is strictly user-initiated.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => navigate('/learn')}
                className="w-full px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors text-center"
              >
                Explore Cyber Safety Portal
              </button>
              <button
                onClick={() => navigate('/download')}
                className="w-full px-5 py-3 rounded-xl bg-blue-600/60 hover:bg-blue-600 border border-blue-400/40 text-white font-semibold text-xs sm:text-sm transition-colors text-center"
              >
                View App Release Channel
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
