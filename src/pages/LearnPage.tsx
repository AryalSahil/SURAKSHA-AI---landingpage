import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  PhoneCall, 
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Award,
  Check,
  X
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const LearnPage: React.FC = () => {
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lessons = [
    {
      id: 'upi-scams',
      title: 'How UPI Scams Work',
      category: 'Payment Security',
      readTime: '4 min read',
      summary:
        'Understand how UPI collect requests, deceptive QR codes, and fake refunds misdirect your funds into scam syndicate accounts.',
      keyWarning: 'Remember: Entering your UPI PIN is ONLY needed when SENDING money, NEVER to receive funds.',
    },
    {
      id: 'otp-takeover',
      title: 'OTP and Account Takeover Scams',
      category: 'Authentication',
      readTime: '5 min read',
      summary:
        'Learn why One-Time Passwords are confidential and how fraudsters trick users into sharing them via fake verification calls.',
      keyWarning: 'No genuine bank, electricity department, or courier delivery agent will ever ask for your OTP.',
    },
    {
      id: 'job-fraud',
      title: 'Fake Job Offers and Advance Fee Fraud',
      category: 'Recruitment Fraud',
      readTime: '4 min read',
      summary:
        'Spot bogus work-from-home offers, task-based Telegram scams, and upfront registration fee traps offering unrealistic daily payouts.',
      keyWarning: 'Legitimate employers never demand upfront security deposits or training fees before paying wages.',
    },
    {
      id: 'loan-apps',
      title: 'Fake Loan Applications & Extortion Software',
      category: 'Lending Traps',
      readTime: '4 min read',
      summary:
        'Recognize illegal loan apps, zero-document approvals, and extortion-based lending software that harvests contact lists.',
      keyWarning: 'Only borrow from RBI-registered NBFCs and banks. Never install APK files from outside the app store for loans.',
    },
    {
      id: 'electricity-bill',
      title: 'Electricity Bill & Disconnection Threats',
      category: 'Utility Traps',
      readTime: '3 min read',
      summary:
        'How scammers use urgent messages claiming your electricity will be disconnected tonight to trick you into downloading malware.',
      keyWarning: 'Utility discoms never send raw APKs or demand payment to personal 10-digit mobile numbers.',
    },
    {
      id: 'digital-arrest',
      title: 'Digital Arrest & Law Enforcement Impersonation',
      category: 'Psychological Coercion',
      readTime: '5 min read',
      summary:
        'Dissecting fictitious video calls claiming customs parcel seizures, money laundering, or CBI arrest warrants to extort funds.',
      keyWarning: 'There is NO legal concept of "digital arrest" via Skype or WhatsApp in Indian law. Police never conduct arrests over video call.',
    },
    {
      id: 'courier-customs',
      title: 'India Post & Courier Re-Delivery Links',
      category: 'Phishing Links',
      readTime: '3 min read',
      summary:
        'Why tiny ₹25 redelivery fees are used as bait on fake indiapost-verify.site domains to steal full debit card credentials and OTPs.',
      keyWarning: 'Always verify postal consignments exclusively at the official portal www.indiapost.gov.in.',
    },
    {
      id: 'customer-care',
      title: 'Manipulated Customer Care Numbers',
      category: 'Search Manipulation',
      readTime: '4 min read',
      summary:
        'How fraudsters post fake toll-free numbers on Google Maps and search listings to coax users into installing AnyDesk or TeamViewer.',
      keyWarning: 'Never install remote screen-sharing tools at the instruction of someone claiming to be bank customer care.',
    },
    {
      id: 'sim-swap',
      title: 'SIM Swap & Unauthorized e-SIM Requests',
      category: 'Telecom Traps',
      readTime: '4 min read',
      summary:
        'How criminals trick citizens into forwarding 20-digit SIM codes or QR requests to take over their mobile number and banking SMS.',
      keyWarning: 'If your phone suddenly loses signal for an extended period in a known coverage zone, contact your telecom operator immediately.',
    },
    {
      id: 'golden-hours-1930',
      title: 'The 2-to-3 Hour Golden Window for 1930',
      category: 'Emergency Action',
      readTime: '3 min read',
      summary:
        'Crucial steps to take within the first 120 minutes of a cyber fraud to increase the likelihood of banks placing a lien on stolen funds.',
      keyWarning: 'Dial 1930 immediately with transaction UTR numbers and beneficiary bank accounts.',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'You receive an SMS from a buyer on OLX asking you to scan a QR code to RECEIVE ₹4,000 for your used bicycle. What happens if you scan and enter your UPI PIN?',
      options: [
        '₹4,000 will be instantly credited to your bank account.',
        '₹4,000 will be DEDUCTED from your bank account and transferred to the scammer.',
        'Your bank will verify the buyer before crediting.',
        'Nothing happens until you approve OTP.',
      ],
      correctIndex: 1,
      explanation: 'Scanning a QR code and entering your UPI PIN is an authorization to TRANSFER money out. You NEVER enter a PIN to receive money on UPI.',
    },
    {
      id: 2,
      question: 'Someone claiming to be from the Cyber Crime Police calls on WhatsApp video showing a police uniform and demands ₹50,000 to avoid "Digital Arrest". What should you do?',
      options: [
        'Transfer the money immediately to avoid legal trouble.',
        'Ask them to send their police ID card on WhatsApp first.',
        'Disconnect immediately, block the number, and report to 1930. There is no legal "digital arrest" in India.',
        'Stay on the call until they send an official PDF notice.',
      ],
      correctIndex: 2,
      explanation: 'Indian law enforcement does NOT arrest people via Skype/WhatsApp or demand payments to clear investigations. It is a psychological extortion racket.',
    },
  ];

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || lesson.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ['All', 'Payment Security', 'Authentication', 'Recruitment Fraud', 'Lending Traps', 'Emergency Action'];

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Citizen Cyber Literacy Curriculum</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Learn Digital Safety. Protect Everyone You Care About.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Master the most common online fraud patterns in Bharat. Practical lessons, zero tech jargon, and actionable safety habits.
          </p>
        </div>

        {/* Emergency Alert Callout */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-950">
                Encountered Active Financial Cyber Fraud?
              </h3>
              <p className="text-xs text-red-800">
                Do not wait. Dial 1930 immediately to freeze fraudulent beneficiary transactions within the 2-3 hour window.
              </p>
            </div>
          </div>
          <a
            href="tel:1930"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap"
          >
            Dial 1930 Helpline
          </a>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons by title, keyword, or fraud vector..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#123B70] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {lesson.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {lesson.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {lesson.summary}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Golden Rule: </strong>{lesson.keyWarning}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Self-Assessment Quiz Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Interactive Knowledge Check
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Test Your Scam Detection Instincts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
              Answer these real-life scenarios to assess your cyber resilience.
            </p>

            <div className="space-y-6">
              {quizQuestions.map((q) => {
                const selected = quizAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      Q{q.id}. {q.question}
                    </h3>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';
                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                          } else if (selected === optIdx) {
                            optStyle = 'bg-red-50 border-red-300 text-red-800';
                          }
                        } else if (selected === optIdx) {
                          optStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [q.id]: optIdx })}
                            className={`w-full p-3 rounded-xl border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctIndex && (
                              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                        isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        <strong>{isCorrect ? '✓ Correct!' : 'ℹ Explanation:'}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              {!quizSubmitted ? (
                <button
                  type="button"
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  onClick={() => setQuizSubmitted(true)}
                  className="px-6 py-2.5 bg-[#123B70] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-blue-900 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Check Answers
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Reset Quiz
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
