import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Lock } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <footer className="bg-[#0B192C] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <img 
                src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png" 
                alt="SURAKSHA AI Logo" 
                className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white leading-none">
                  SURAKSHA AI
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                  Think Safe · Stay Secure · Be Aware
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering Indian citizens with accessible scam awareness, suspicious link analysis, and immediate guidance when encountering fraud.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/80 rounded-lg text-xs text-slate-400 border border-slate-700/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>National Cyber Safety Initiative · Hackathon Project</span>
            </div>
          </div>

          {/* Emergency Support Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Emergency Response
            </h4>
            
            <div className="p-3 bg-red-950/40 rounded-xl border border-red-900/50 space-y-1.5">
              <div className="text-[11px] text-red-300 font-semibold">Active National Toll-Free:</div>
              <a
                href="tel:1930"
                className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-bold text-sm"
              >
                <PhoneCall className="w-4 h-4 fill-current" />
                <span>Dial 1930</span>
              </a>
              <div className="text-[10px] text-slate-400">Financial Cyber Fraud Helpline (24x7)</div>
            </div>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 pt-1"
            >
              <span>cybercrime.gov.in (National Portal)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Platform Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/" onClick={(e) => handleNav('/', e)} className="hover:text-white transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="/features" onClick={(e) => handleNav('/features', e)} className="hover:text-white transition-colors">
                  Scam Defense Features
                </a>
              </li>
              <li>
                <a href="/how-it-works" onClick={(e) => handleNav('/how-it-works', e)} className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/download" onClick={(e) => handleNav('/download', e)} className="hover:text-white transition-colors">
                  Download Android APK
                </a>
              </li>
              <li>
                <a href="/learn" onClick={(e) => handleNav('/learn', e)} className="hover:text-white transition-colors">
                  Cyber Safety Portal
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleNav('/faq', e)} className="hover:text-white transition-colors">
                  FAQ & Guidance
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional / Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Institutional & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-white transition-colors">
                  About the Initiative
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav('/contact', e)} className="hover:text-white transition-colors">
                  Contact & Scam Reports
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleNav('/privacy', e)} className="hover:text-white transition-colors">
                  Privacy Safeguards
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleNav('/terms', e)} className="hover:text-white transition-colors">
                  Terms of Public Use
                </a>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <a href="/admin/login" onClick={(e) => handleNav('/admin/login', e)} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>Admin Dashboard</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <div>
            © 2026 SURAKSHA AI. Dedicated to a cyber-secure India.
          </div>

          <div className="max-w-xl text-[11px] text-slate-500 leading-normal">
            Disclaimer: SURAKSHA AI is an educational digital safety assistant designed to help recognize scam patterns and learn preventive measures. For legal complaints, please report directly to the official portal at cybercrime.gov.in.
          </div>
        </div>

      </div>
    </footer>
  );
};
