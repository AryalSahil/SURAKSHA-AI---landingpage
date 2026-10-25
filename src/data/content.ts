import { ThreatCategory, FeatureItem, FaqItem, ScamExample, SupportedLanguage } from '../types';

export const UI_TRANSLATIONS: Record<SupportedLanguage, {
  emergencyBar: string;
  dialHelpline: string;
  portalLink: string;
  navHome: string;
  navFeatures: string;
  navHowItWorks: string;
  navSafety: string;
  navAbout: string;
  navFaq: string;
  downloadApp: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  downloadAndroid: string;
  exploreFeatures: string;
  trustSimple: string;
  trustLangs: string;
  trustSteps: string;
  heroDisclaimer: string;
}> = {
  en: {
    emergencyBar: "NATIONAL CYBERCRIME ALERT: Financial fraud or suspicious message received?",
    dialHelpline: "Dial 1930 Helpline",
    portalLink: "cybercrime.gov.in",
    navHome: "Home",
    navFeatures: "Features",
    navHowItWorks: "How It Works",
    navSafety: "Digital Safety",
    navAbout: "About",
    navFaq: "FAQ",
    downloadApp: "Download App",
    heroBadge: "Digital Safety for Everyone",
    heroHeadline: "Your First Line of Defence Against Online Scams.",
    heroSubheadline: "Check suspicious messages, identify potential scam warning signs, and learn what to do next. Stay safer online with simple explanations designed for everyone.",
    downloadAndroid: "Download for Android",
    exploreFeatures: "Explore Features",
    trustSimple: "Simple, easy-to-understand guidance",
    trustLangs: "English, Hindi & Assamese support",
    trustSteps: "Practical steps to stay safer online",
    heroDisclaimer: "An AI-assisted safety tool. No detection system is perfect. Always exercise personal caution."
  },
  hi: {
    emergencyBar: "राष्ट्रीय साइबर अपराध अलर्ट: वित्तीय धोखाधड़ी या संदिग्ध संदेश मिला?",
    dialHelpline: "1930 हेल्पलाइन डायल करें",
    portalLink: "cybercrime.gov.in",
    navHome: "होम",
    navFeatures: "सुविधाएं",
    navHowItWorks: "यह कैसे काम करता है",
    navSafety: "डिजिटल सुरक्षा",
    navAbout: "परिचय",
    navFaq: "अक्सर पूछे जाने वाले सवाल",
    downloadApp: "ऐप डाउनलोड करें",
    heroBadge: "हर नागरिक के लिए डिजिटल सुरक्षा",
    heroHeadline: "ऑनलाइन घोटालों के खिलाफ आपकी पहली रक्षा पंक्ति।",
    heroSubheadline: "संदिग्ध संदेशों की जांच करें, संभावित घोटालों के चेतावनी संकेतों को पहचानें और समझें कि आगे क्या करना है। सभी के लिए सरल और स्पष्ट मार्गदर्शन।",
    downloadAndroid: "Android के लिए डाउनलोड करें",
    exploreFeatures: "सुविधाएं देखें",
    trustSimple: "सरल, आसानी से समझ में आने वाला मार्गदर्शन",
    trustLangs: "अंग्रेजी, हिन्दी एवं অসমীয়া (असमिया) भाषा में उपलब्ध",
    trustSteps: "ऑनलाइन सुरक्षित रहने के व्यावहारिक कदम",
    heroDisclaimer: "यह एक AI-सहायक सुरक्षा उपकरण है। कोई भी पहचान प्रणाली शत-प्रतिशत त्रुटिहीन नहीं होती। हमेशा व्यक्तिगत सावधानी बरतें।"
  },
  as: {
    emergencyBar: "ৰাষ্ট্ৰীয় চাইবাৰ ক্ৰাইম সতৰ্কবাৰ্তা: বিত্তীয় প্ৰৱঞ্চনা বা সন্দেহজনক বাৰ্তা পাইছে নেকি?",
    dialHelpline: "১৯৩০ হেল্পলাইনত কল কৰক",
    portalLink: "cybercrime.gov.in",
    navHome: "মূল পৃষ্ঠা",
    navFeatures: "বৈশিষ্ট্যসমূহ",
    navHowItWorks: "ই কেনেদৰে কাম কৰে",
    navSafety: "ডিজিটেল সুৰক্ষা",
    navAbout: "পৰিচয়",
    navFaq: "প্ৰশ্নোত্তৰ",
    downloadApp: "এপ ডাউনলোড কৰক",
    heroBadge: "প্ৰতিজন নাগৰিকৰ বাবে ডিজিটেল সুৰক্ষা",
    heroHeadline: "অনলাইন প্ৰৱঞ্চনাৰ বিৰুদ্ধে আপোনাৰ প্ৰথম সুৰক্ষা কৱচ।",
    heroSubheadline: "সন্দেহজনক বাৰ্তা পৰীক্ষা কৰক, সম্ভাব্য প্ৰৱঞ্চনাৰ সতৰ্কবাণীসমূহ চিনাক্ত কৰক আৰু পৰৱৰ্তী পদক্ষেপ কি হ’ব লাগে সহজ ভাষাত জানক।",
    downloadAndroid: "Android-ৰ বাবে ডাউনলোড কৰক",
    exploreFeatures: "বৈশিষ্ট্য চাওক",
    trustSimple: "সহজ, বোধগম্য নিৰ্দেশনা",
    trustLangs: "ইংৰাজী, হিন্দী আৰু অসমীয়া ভাষাত উপলব্ধ",
    trustSteps: "অনলাইনত সুৰক্ষিত থাকিবলৈ প্ৰয়োজনীয় পদক্ষেপ",
    heroDisclaimer: "এইটো এটা AI-সহায়তাপ্রাপ্ত সুৰক্ষা আহিলা। কোনো ব্যৱস্থাই সম্পূৰ্ণ নিখুঁত নহয়। সদায় নিজৰ সতৰ্কতা অৱলম্বন কৰক।"
  }
};

export const THREAT_CATEGORIES: ThreatCategory[] = [
  {
    id: "job-fraud",
    tag: "EMPLOYMENT FRAUD",
    tagColor: "text-rose-600 bg-rose-50 border-rose-200",
    title: "Fake Job Offers & Registration Fees",
    description: "Bogus recruiters asking for 'documentation charges' or registration deposits for guaranteed work-from-home jobs, task-based income, or government appointments.",
    iconName: "Briefcase"
  },
  {
    id: "predatory-loans",
    tag: "PREDATORY LENDING",
    tagColor: "text-amber-600 bg-amber-50 border-amber-200",
    title: "Fraudulent Loan Messages",
    description: "Instant easy-loan approvals offering unrealistic interest rates, followed by deceptive processing fees, unauthorized app permissions, and extortionate recovery harassment.",
    iconName: "CreditCard"
  },
  {
    id: "upi-traps",
    tag: "PAYMENT TRAPS",
    tagColor: "text-blue-600 bg-blue-50 border-blue-200",
    title: "Suspicious UPI Payment Requests",
    description: "Deceptive 'Receive Money' collect requests masquerading as incoming prizes, OLX buyer advance tokens, lottery winnings, or fake charitable transfers.",
    iconName: "ShieldAlert"
  },
  {
    id: "phishing-courier",
    tag: "SCHEMES & IDENTITY",
    tagColor: "text-purple-600 bg-purple-50 border-purple-200",
    title: "Phishing Links & Impersonation",
    description: "Flawed banking portals, courier tracking redirects, fake India Post delivery alerts, and electricity bill cutoff warnings designed to steal netbanking logins.",
    iconName: "Globe"
  },
  {
    id: "customer-care",
    tag: "SOCIAL IMPERSONATION",
    tagColor: "text-teal-600 bg-teal-50 border-teal-200",
    title: "Fake Customer Care Numbers",
    description: "Manipulated search engine results and social handles leading directly to rogue operators who coax victims into installing screen-sharing software (AnyDesk, TeamViewer).",
    iconName: "Headphones"
  },
  {
    id: "digital-arrest",
    tag: "PSYCHOLOGICAL COERCION",
    tagColor: "text-red-600 bg-red-50 border-red-200",
    title: "Urgent Pressure & 'Digital Arrest'",
    description: "Automated alerts claiming immediate SIM card blockages, utility disconnections, customs parcel seizures, or fictitious digital arrest warrants from law enforcement.",
    iconName: "AlertTriangle"
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: "smart-checker",
    title: "Smart Scam Checker",
    description: "Review suspicious SMS, WhatsApp forwards, and email clips. Identifies high-risk urgency phrases, pressure markers, and spoofed bank contact headers.",
    badge: "See how detection works",
    iconName: "ShieldCheck"
  },
  {
    id: "link-checker",
    title: "Suspicious Link Checker",
    description: "Unravel masked, shortened, or deceptive URLs (e.g. typosquatting like sbi-netbank-login.xyz) before you ever click or submit confidential data.",
    badge: "Check link safety precautions",
    iconName: "Globe"
  },
  {
    id: "ai-explanations",
    title: "Clear AI Explanations",
    description: "No confusing tech jargon. SURAKSHA AI explains strictly why a message looks dangerous and gives you specific logical verification checks to perform.",
    badge: "Actionable anti-manipulation cues",
    iconName: "Sparkles"
  },
  {
    id: "regional-languages",
    title: "Regional Language Support",
    description: "Democratizing cyber safety across Bharat. Full interfaces, local complaint scripts, and plain-language explanations in English, हिन्दी, and অসমীয়া.",
    badge: "Culturally tailored safety alerts",
    iconName: "Languages"
  },
  {
    id: "learn-safety",
    title: "Learn Digital Safety",
    description: "Build your digital defense through bite-sized interactive case studies, real scam scenario simulations, and self-assessment safety quizzes.",
    badge: "Cultivate daily awareness skills",
    iconName: "BookOpen"
  },
  {
    id: "reporting-guidance",
    title: "Fraud Reporting Guidance",
    description: "Step-by-step practical instructions for preserving evidence, reporting fraudulent UPI handles/accounts, and accessing the official 1930 National Cyber Crime Portal.",
    badge: "Emergency 1930 escalation guides",
    iconName: "FileCheck"
  }
];

export const SCAM_PRESETS: ScamExample[] = [
  {
    id: "job-scam",
    label: "Fake Work-From-Home Job",
    text: "Dear candidate, you have been selected for Amazon Data Entry Job (Work from Home). Daily payout ₹2,500. Pay ₹499 registration fee to activate ID immediately on GPay: 9876543210. Limited slots!",
    riskLevel: "HIGH RISK",
    riskScore: 94,
    detectedSigns: [
      "Advance Registration Fee: Legitimate recruiters never ask for upfront payment for job allocation.",
      "Urgency Pressure: Creates false scarcity ('Limited slots, activate immediately') to prevent careful thought.",
      "Personal UPI ID: Payment directed to an individual mobile number rather than an official corporate escrow."
    ],
    explanation: "This is a classic upfront fee employment fraud. Legitimate hiring firms or platforms never demand fees for assigning tasks or dispatching employment credentials.",
    recommendedAction: "Do NOT transfer any money. Block the sender number on WhatsApp and mark the message as Spam."
  },
  {
    id: "electricity-bill",
    label: "Electricity Bill Disconnection",
    text: "Dear Consumer, your electricity power supply will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Please immediately call Electricity Officer at 98451xxxxx or install APK bill-update.apk to avoid power cut.",
    riskLevel: "HIGH RISK",
    riskScore: 98,
    detectedSigns: [
      "Unsolicited APK Download: Utility boards never send executable APK files over SMS or WhatsApp.",
      "Artificial Deadline: Threatening power cutoff within hours to panic the victim.",
      "Personal Mobile Contact: State discoms operate verified customer care centers, not random 10-digit mobile numbers."
    ],
    explanation: "State power distribution companies never dispatch direct APK download files or individual mobile numbers to update utility bills. Downloading such APKs installs remote spyware to steal banking credentials.",
    recommendedAction: "Never install the attached APK file. Check your bill status exclusively on your state electricity board's official website or consumer portal."
  },
  {
    id: "upi-collect",
    label: "UPI 'Receive Money' Trap",
    text: "Congratulations! You have received a cash reward of ₹5,000 from PhonePe Diwali Lucky Draw. Click here to claim your reward into your bank account: upi://pay?pa=claimreward99@okaxis&pn=RewardBonus&am=5000",
    riskLevel: "HIGH RISK",
    riskScore: 92,
    detectedSigns: [
      "Deceptive Collect Request: To RECEIVE money on UPI, you NEVER need to enter your UPI PIN.",
      "Unexpected Prize / Lottery: You cannot win a contest or lottery you never entered.",
      "Misleading 'Claim' Action: Approving the prompt deducts ₹5,000 from YOUR account instead of crediting it."
    ],
    explanation: "Scammers abuse UPI Collect requests by dressing them up as 'prizes'. Approving a collect request and typing your 4 or 6-digit UPI PIN will transfer your own money to the fraudster.",
    recommendedAction: "Decline the collect request immediately. Remember the golden rule: Entering UPI PIN always DEDUCTS money, never credits it."
  },
  {
    id: "courier-customs",
    label: "Customs Parcel Hold",
    text: "India Post Notice: Your parcel #IN889218 cannot be delivered due to incomplete delivery address. Please update address and pay ₹25 customs re-delivery fee within 12 hours: http://indiapost-parcel-verify.site/track",
    riskLevel: "HIGH RISK",
    riskScore: 89,
    detectedSigns: [
      "Deceptive Domain: Look closely at 'indiapost-parcel-verify.site' — the official Indian postal portal is indiapost.gov.in.",
      "Nominal Fee Trap: ₹25 is used as bait to capture full debit card credentials and OTP.",
      "12-Hour Urgency: Rushes users into entering sensitive credit/debit card numbers without verifying."
    ],
    explanation: "Fraudsters send bulk SMS regarding parcels. The link leads to a clone site where entering card details allows them to siphon larger sums via subsequent OTP intercepts.",
    recommendedAction: "Check parcel tracking directly on www.indiapost.gov.in using your consignment number. Never enter card details on unverified web links."
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-suraksha",
    question: "What is SURAKSHA AI?",
    answer: "SURAKSHA AI is a citizen-focused digital safety initiative and Android app designed to help Indian citizens detect online scam warning signs, understand psychological manipulation tactics, and learn practical next steps in simple, non-technical language."
  },
  {
    id: "how-to-download",
    question: "How do I download the Android app?",
    answer: "You can download the official SURAKSHA AI Android APK directly from our verified Download section on this website. Because it is distributed as a direct APK during our hackathon evaluation phase, Android will prompt you to 'Allow installation from this source' during setup. A step-by-step installation guide is provided."
  },
  {
    id: "guarantee-safe",
    question: "Can SURAKSHA AI guarantee that a message is 100% safe?",
    answer: "No automated tool can provide a 100% guarantee. SURAKSHA AI is an AI-assisted heuristic safety companion that highlights red flags, common scam patterns, and risk indicators. We encourage everyone to always exercise independent verification and never rely solely on any automated system."
  },
  {
    id: "banking-details",
    question: "Does the app need my banking details or sensitive passwords?",
    answer: "Never. SURAKSHA AI strictly does NOT ask for, require, or store any banking passwords, UPI PINs, card CVVs, or Aadhaar numbers. Our app only analyzes the text or links you choose to paste for safety evaluation, and no personal data is logged."
  },
  {
    id: "supported-languages",
    question: "What languages are supported?",
    answer: "SURAKSHA AI currently provides localized guidance in English, हिन्दी (Hindi), and অসমীয়া (Assamese). We are continuously expanding support for additional scheduled Indian languages including Bengali, Tamil, Telugu, and Marathi."
  },
  {
    id: "lost-money",
    question: "What should I do if I have already lost money to a scam?",
    answer: "Act immediately: 1) Call India's National Cyber Crime Helpline at 1930 without delay (reporting within 2-3 hours significantly increases chances of banks freezing the funds). 2) File a formal complaint at cybercrime.gov.in. 3) Contact your bank to freeze the compromised account or debit card. 4) Save screenshots, SMS messages, and UPI transaction reference IDs as evidence."
  },
  {
    id: "report-bug",
    question: "How do I report a bug or suggest a feature?",
    answer: "You can use the 'Share Feedback' button on this website or in the app's settings menu. As this is an open hackathon initiative, we welcome community feedback, scam pattern submissions, and feature suggestions to improve safety for all citizens."
  }
];
