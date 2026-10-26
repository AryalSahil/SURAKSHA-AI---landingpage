import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const PrivacyPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Citizen Privacy & Data Protection Charter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            SURAKSHA AI Privacy Policy
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Effective Date: October 2026 · Built for Indian Citizen Safety
          </p>
        </div>

        {/* Core Principles Summary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs mb-10 space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Our Non-Negotiable Privacy Commitments:</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-xs font-bold text-slate-900 block mb-1">Zero Credentials</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                We never ask for, log, or store your UPI PIN, banking passwords, OTPs, or card CVVs.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-xs font-bold text-slate-900 block mb-1">No Contact Scraping</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                SURAKSHA AI does not request or harvest your address book, call logs, or camera stream.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-xs font-bold text-slate-900 block mb-1">Zero Commercial Ads</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                No third-party ad tracking, no profiling, and zero sale of citizen interaction patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              1. Information You Provide for Safety Inspection
            </h3>
            <p>
              When using SURAKSHA AI’s scam checker or URL analyzer, you manually paste the text snippet, SMS message, or web address you wish to inspect. This inspection is strictly ephemeral and initiated by your tap. We extract heuristic markers (such as urgency phrasing, raw IP addresses, and advance fee patterns) and return immediate guidance.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              2. Technical Permissions and Device Access
            </h3>
            <p>
              The SURAKSHA AI Android application is purposefully built with minimum system privileges:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>No SMS Read Privilege:</strong> We do NOT read your personal SMS inbox in the background. You selectively paste messages you find suspicious.</li>
              <li><strong>No Device Admin Rights:</strong> The app never requests administrator elevation or screen accessibility capture outside of the active app window.</li>
              <li><strong>Network Access:</strong> Minimal network usage used exclusively to query up-to-date threat heuristics and fetch verified advisories.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              3. Citizen Feedback and Threat Pattern Submissions
            </h3>
            <p>
              If you voluntarily submit a scam template via our Contact & Feedback form, that text is stripped of any obvious personal identifiers (phone numbers, account names) and used solely to refine scam detection rules for the benefit of all citizens.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              4. Data Retention and Server Infrastructure
            </h3>
            <p>
              Our web and backend infrastructure operates in secure environments with encrypted transport (HTTPS / TLS 1.3). No personal conversation archives or browsing histories are kept.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              5. Official Coordination with Cybercrime Authorities
            </h3>
            <p>
              SURAKSHA AI is an educational safety tool and does not transmit your personal data to law enforcement without your explicit action. When you tap to call 1930 or visit cybercrime.gov.in, you interact directly with official Government of India portals.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              6. Grievance Redressal Contact
            </h3>
            <p>
              For privacy inquiries, security questions, or data queries regarding this hackathon initiative, please contact:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono space-y-1">
              <div>Initiative Nodal Officer: Privacy Team, SURAKSHA AI</div>
              <div>Email: nodal@suraksha-ai.org</div>
              <div>National Helpline Coordination: 1930 (Cyber Crime)</div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
