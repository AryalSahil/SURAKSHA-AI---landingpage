import React from 'react';
import { Heart, MessageSquare, ShieldCheck, CheckSquare } from 'lucide-react';

interface FeedbackBannerProps {
  onOpenFeedback: () => void;
  onOpenChecklist: () => void;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({ onOpenFeedback, onOpenChecklist }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F5F8FC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-b from-[#EBF2FE] to-[#DFEBFA] rounded-3xl p-8 sm:p-12 text-center border border-blue-200/80 shadow-md relative overflow-hidden">
          
          {/* Subtle Heart Shield Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#123B70] text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
            <Heart className="w-7 h-7 fill-red-400 stroke-red-400" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] tracking-tight">
            Help Us Make Digital Safety Better
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
            Developed with care for Indian citizens. Your feedback shapes the future of AI-assisted scam prevention across Bharat.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenFeedback}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B192C] hover:bg-[#123B70] text-white text-sm font-bold shadow-md transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share Feedback / Suggest Feature</span>
            </button>

            <button
              onClick={onOpenChecklist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-blue-600" />
              <span>Safety Checklist</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
