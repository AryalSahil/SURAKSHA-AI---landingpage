import React from 'react';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const TermsPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Public Good Terms of Service</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SURAKSHA AI Terms of Use
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Last Updated: October 2026 · Digital Safety & Scam Awareness
          </p>
        </div>

        {/* Disclaimer Callout Box */}
        <div className="p-6 rounded-3xl bg-amber-50/90 border border-amber-200/90 text-amber-950 mb-10 space-y-2 text-xs sm:text-sm leading-relaxed">
          <div className="font-bold flex items-center gap-2 text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Important Citizen Advisory</span>
          </div>
          <p>
            SURAKSHA AI is an <strong>educational digital safety tool</strong> engineered to highlight red flags and assist citizens in spotting deceptive tactics. It is not an insurance policy, a certified financial auditor, or a replacement for official police FIR registration. Always exercise independent personal caution before conducting financial transactions.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              1. Acceptance and Purpose
            </h3>
            <p>
              By accessing the SURAKSHA AI website, utilizing our scam inspection simulator, or downloading our Android application, you agree to these Terms of Use. The platform is offered as a public-good educational resource for Indian citizens to build cyber resilience against deceptive online schemes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              2. Nature of Heuristic Assessments
            </h3>
            <p>
              Scam assessments and risk scores provided by SURAKSHA AI are generated via multi-signal heuristic pattern recognition. While designed to detect common deceptive patterns (urgency markers, upfront registration fees, typosquatting domains), no automated detection tool can guarantee 100% accuracy. A "Safe" assessment is an indicator that no recognized red flags were triggered, not a legal or financial warranty of safety.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              3. No Replacement for Law Enforcement
            </h3>
            <p>
              SURAKSHA AI is an independent software initiative developed for a cybersecurity hackathon. It is not an agency of the Ministry of Home Affairs, state police departments, or the Reserve Bank of India. In situations of monetary loss or cyber extortion, you must promptly dial national helpline <strong>1930</strong> or register at <strong>cybercrime.gov.in</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              4. Prohibited Uses
            </h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Use the system to reverse-engineer scam evasion techniques or test phishing campaigns.</li>
              <li>Input unauthorized personal banking passwords, PINs, or confidential financial credentials.</li>
              <li>Interfere with, overload, or launch denial-of-service attacks against the platform infrastructure.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              5. Intellectual Property and Open Awareness
            </h3>
            <p>
              The SURAKSHA AI name, shield logo mark, curriculum lessons, and threat taxonomy are protected intellectual assets. Educational reproduction by schools, citizen forums, and NGOs for non-commercial cyber safety awareness is permitted with attribution.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              6. Limitation of Liability
            </h3>
            <p>
              To the fullest extent permissible by applicable law, SURAKSHA AI, its creators, and project contributors shall not be held liable for any financial losses, unauthorized transactions, or damages arising from citizen reliance on automated assessments. Citizens are always urged to independently verify unexpected demands directly with their financial institution.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
