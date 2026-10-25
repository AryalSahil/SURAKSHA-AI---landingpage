import React from 'react';
import { PhoneCall, ExternalLink, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UI_TRANSLATIONS } from '../data/content';

interface EmergencyBannerProps {
  currentLang: SupportedLanguage;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang];

  return (
    <aside aria-label="Emergency Cyber Helpline" className="bg-[#0B192C] text-slate-100 text-xs py-2 px-4 border-b border-slate-800 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500/20 text-red-400 shrink-0">
            <AlertCircle className="w-3 h-3 text-red-400" />
          </span>
          <span className="font-medium text-slate-200">
            {t.emergencyBar}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:1930"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm transition-colors text-xs whitespace-nowrap"
            title="Immediate National Cyber Crime Helpline"
          >
            <PhoneCall className="w-3 h-3 fill-current" />
            <span>{t.dialHelpline}</span>
          </a>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors underline underline-offset-2 text-xs whitespace-nowrap"
          >
            <span>{t.portalLink}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
