import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenFeedback: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload, onOpenFeedback }) => {
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
              <span>National Cyber Safety Initiative</span>
            </div>
          </div>

          {/* Emergency Support Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Emergency Support
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
              <div className="text-[10px] text-slate-400">Financial Cyber Fraud Helpline</div>
            </div>

            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 pt-1"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Platform Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-white transition-colors">Features & Diagnostics</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">Scam Scanner & URL Checker</a>
              </li>
              <li>
                <a href="#languages" className="hover:text-white transition-colors">Digital Safety Curriculum</a>
              </li>
              <li>
                <a href="#download" onClick={onOpenDownload} className="hover:text-white transition-colors">Download Android App</a>
              </li>
              <li>
                <button onClick={onOpenFeedback} className="hover:text-white transition-colors text-left">
                  Share Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional / Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Institutional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-white transition-colors">Hackathon Project Showcase</a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white transition-colors">Privacy Safeguards</a>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Terms of Public Service</span>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Report Scam (IRC 1930)
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
