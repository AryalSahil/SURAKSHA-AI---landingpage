import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Download, 
  CheckCircle2, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink,
  Smartphone,
  Star,
  Send
} from 'lucide-react';

interface InstallationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallationModal: React.FC<InstallationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: 1,
      title: "Tap 'Download Android APK'",
      detail: "Save the 'suraksha-ai-v1.0.0-beta.apk' file to your Android smartphone's download folder."
    },
    {
      step: 2,
      title: "Open the Downloaded APK",
      detail: "Swipe down your Android notification shade or open your phone's 'Files' or 'Downloads' app, then tap on the SURAKSHA AI file."
    },
    {
      step: 3,
      title: "Allow 'Install Unknown Apps' if prompted",
      detail: "Android will show a safety notice: 'For your security, your phone is not allowed to install unknown apps from this source.' Tap Settings > toggle 'Allow from this source'."
    },
    {
      step: 4,
      title: "Tap 'Install' & Launch",
      detail: "Confirm the installation. Once completed, tap 'Open'. No special device administrator permissions or SMS reading privileges are required."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Android APK Installation Guide
              </h3>
              <p className="text-xs text-slate-500">
                Step-by-step sideloading for Android 8.0 through 14
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="py-4 space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {steps.map((s) => (
            <div key={s.step} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-6 h-6 rounded-full bg-[#123B70] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {s.step}
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Notice */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-snug">
          <strong>Security Notice:</strong> Only install the APK downloaded from this verified website. We never ask for banking credentials or sensitive permissions.
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#123B70] text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState('New Scam Pattern');
  const [device, setDevice] = useState('Samsung Galaxy');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Share Feedback or Report Scam Pattern
            </h3>
            <p className="text-xs text-slate-500">
              Help us expand SURAKSHA AI's detection database for Indian citizens
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Dhanyavaad! Feedback Received</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Thank you for contributing to national cyber fraud awareness. Our team reviews pattern submissions to update safety rules.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4">
            
            {/* Feedback category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Feedback Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="New Scam Pattern">Report a New Scam Pattern / Message</option>
                <option value="Translation Correction">Regional Translation Suggestion (Hindi/Assamese)</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">App Bug Report</option>
              </select>
            </div>

            {/* Smartphone Device */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Smartphone Brand / Model
              </label>
              <input
                type="text"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                placeholder="e.g. Redmi Note 12, Samsung M34, Vivo T2"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-800"
                required
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400' : 'text-slate-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Comments / Scam Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Details or Suspicious Message Text
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Paste the suspicious SMS, WhatsApp message, or describe your suggestion..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 text-slate-800 resize-none"
                required
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#123B70] text-white text-xs font-bold rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

interface SafetyChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyChecklistModal: React.FC<SafetyChecklistModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-bold text-slate-900">
              Immediate Cyber Fraud Emergency Checklist
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-red-50 rounded-xl border border-red-200">
            <h4 className="font-bold text-red-950 mb-1">1. If Money Was Deducted (Golden Hours)</h4>
            <p className="text-slate-600">
              Call <strong>1930</strong> immediately. Reporting within 2-3 hours enables law enforcement to liaise with the recipient bank to place a lien or freeze on the beneficiary account before cash-out.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">2. Contact Your Bank Helpline</h4>
            <p className="text-slate-600">
              Immediately block the compromised debit card, UPI ID, or netbanking credentials by calling your bank's 24x7 toll-free fraud helpline (found on the back of your debit card).
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">3. Preserve All Evidence</h4>
            <p className="text-slate-600">
              Capture full-screen screenshots of SMS messages, WhatsApp chats, fake web URLs, UPI reference (UTR) numbers, and caller IDs. Do not delete the message history.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-1">4. Lodge Official Complaint</h4>
            <p className="text-slate-600">
              Visit <strong>cybercrime.gov.in</strong> to file a formal digital complaint and obtain an official acknowledgment number.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-slate-100">
          <a
            href="tel:1930"
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-current" />
            <span>Call 1930</span>
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold"
          >
            Close Checklist
          </button>
        </div>

      </div>
    </div>
  );
};
