import React from 'react';
import { 
  PhoneCall, 
  ExternalLink, 
  ShieldAlert, 
  KeyRound, 
  SearchCheck, 
  FileText,
  AlertOctagon,
  Info
} from 'lucide-react';

export const ResponsibleSafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-14">
          <span className="text-xs font-bold text-red-600 tracking-wider uppercase bg-red-50 px-3 py-1 rounded-full border border-red-200/60 inline-block mb-3">
            Emergency Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Know What to Do When Something Goes Wrong.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            SURAKSHA AI is your educational guide. If financial fraud has occurred, taking quick, methodical official actions is vital.
          </p>
        </div>

        {/* 3 Golden Precaution Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-red-100/80 text-red-700 flex items-center justify-center font-bold text-base mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Never Share OTPs or UPI PINs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No genuine bank officer, electricity agent, or courier company will EVER ask for your one-time password (OTP) or UPI PIN to credit funds.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center font-bold text-base mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Independently Verify Demands
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If someone claims your SIM card is expiring or a police warrant is pending, disconnect immediately. Reach out only through certified official numbers.
            </p>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Preserve Digital Evidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Take clear screenshots of deceptive SMS messages, chat conversations, website URLs, and bank debit notifications before blocking rogue numbers.
            </p>
          </div>

        </div>

        {/* High-Impact National Emergency Helpline Box */}
        <div className="bg-gradient-to-r from-[#0B192C] via-[#123B70] to-[#0B192C] rounded-2xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-semibold">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>National Action Direct Response</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                National Cyber Crime Reporting Helpline: Dial 1930
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                In case of financial fraud, reporting within the <strong>first 2 to 3 hours</strong> increases the likelihood of banks freezing fraudulent funds before scam syndicates withdraw them.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="tel:1930"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-md transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-5 h-5 fill-current" />
                <span>Call 1930 Helpline</span>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
              >
                <span>Visit Official Cybercrime Portal</span>
                <ExternalLink className="w-4 h-4 text-slate-300" />
              </a>
            </div>

          </div>

          {/* Institutional Advisory Disclaimer Note */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
            <Info className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
            <p>
              <strong>Institutional Notice:</strong> SURAKSHA AI is an educational technology safety resource built for awareness, pattern recognition, and education. It complements rather than replaces official police authorities. Automated assessments can occasionally make errors. SURAKSHA AI does not itself register or submit formal First Information Reports (FIRs) or legal complaints.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
