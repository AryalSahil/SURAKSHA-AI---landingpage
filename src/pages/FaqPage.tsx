import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, MessageSquare, PhoneCall } from 'lucide-react';
import { FAQ_ITEMS } from '../data/content';
import { useRouter } from '../context/RouterContext';

export const FaqPage: React.FC = () => {
  const { navigate } = useRouter();
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const extendedFaqs = [
    ...FAQ_ITEMS,
    {
      id: 'offline-access',
      question: 'Can SURAKSHA AI check messages when my phone is offline?',
      answer: 'Yes, core heuristic patterns (such as standard urgency phrase detection, advance fee patterns, and basic URL typosquatting flags) are evaluated directly on your device without needing an active data connection.'
    },
    {
      id: 'reporting-false-positives',
      question: 'What if a legitimate message is flagged as suspicious by mistake?',
      answer: 'Because scammers intentionally mimic legitimate organizations, cautious flags may occasionally appear on genuine messages with short URLs. You can tap "Report Feedback" to submit the template so our security team can tune heuristic accuracy.'
    },
    {
      id: 'police-fir-clarification',
      question: 'Does SURAKSHA AI file a police FIR on my behalf?',
      answer: 'No. SURAKSHA AI is strictly an educational cyber safety assistant. It does not file official police FIRs or submit legal complaints directly. For official legal action, citizens must contact India’s 24/7 Helpline 1930 or file directly at cybercrime.gov.in.'
    }
  ];

  const toggleFaq = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = extendedFaqs.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Citizen Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Clear, transparent answers regarding citizen privacy, functionality, and cyber protection.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type your question or keyword (e.g. 1930, banking, APK, privacy)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-14">
          {filteredFaqs.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-blue-300 bg-white shadow-xs'
                    : 'border-slate-200 bg-white/90 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base focus:outline-none cursor-pointer"
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="p-8 rounded-3xl bg-blue-50/80 border border-blue-200 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            Have a question or encounter a new scam pattern not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Our team welcomes pattern submissions from across India to expand regional heuristic protections.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 bg-[#123B70] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit Question or Scam Report</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
