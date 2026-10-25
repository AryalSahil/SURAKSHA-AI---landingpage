import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Copy
} from 'lucide-react';
import { SCAM_PRESETS } from '../data/content';
import { ScamExample } from '../types';

export const HowItWorksSection: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<ScamExample>(SCAM_PRESETS[0]);
  const [customInput, setCustomInput] = useState(SCAM_PRESETS[0].text);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);

  const handleSelectPreset = (preset: ScamExample) => {
    setSelectedPreset(preset);
    setCustomInput(preset.text);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 400);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 500);
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F5F8FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60 inline-block mb-3">
            Simplicity First
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SURAKSHA AI Works.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Three uncomplicated steps that transform confusing cyber hazards into calm, decisive safety.
          </p>
        </div>

        {/* 3 Step Sequence with Connected Numbers */}
        <div className="relative mb-20">
          
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0B192C] text-white flex items-center justify-center font-extrabold text-xl shadow-md mb-5">
                1
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                STEP ONE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Check
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Paste a suspicious message, enter an unfamiliar web link, or paste a UPI collect handle into the analysis field.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-extrabold text-xl shadow-md mb-5">
                2
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                STEP TWO
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Understand
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Review potential warning signs alongside a plain-language explanation breaking down deceptive tricks and urgency tactics.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-xs text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#123B70] text-white flex items-center justify-center font-extrabold text-xl shadow-md mb-5">
                3
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                STEP THREE
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Act Safely
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Follow practical precautions, share safety warnings with family members, or access official cyber helpline resources directly.
              </p>
            </div>

          </div>
        </div>

        {/* Live Interactive Scam Inspector Simulator */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          
          <div className="bg-[#0B192C] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-base font-bold text-white">
                  Interactive Scam Inspector Demo
                </h4>
                <p className="text-xs text-slate-300">
                  Experience how SURAKSHA AI breaks down deceptive patterns into clear safety cues.
                </p>
              </div>
            </div>

            {/* Preset Selector Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Try preset:</span>
              {SCAM_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                    selectedPreset.id === preset.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {preset.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Input Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Suspicious Message or Link to inspect:</span>
                <span className="text-slate-400">Heuristic pattern engine active</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  rows={2}
                  className="flex-1 p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none font-sans"
                  placeholder="Paste any suspicious SMS, WhatsApp message, or website link..."
                />
                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="px-6 py-3 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all whitespace-nowrap shrink-0 disabled:opacity-75"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Scan Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Scan Results Breakdown */}
            {hasScanned && (
              <div className="bg-[#F8FAFC] rounded-xl p-5 border border-amber-200/80 space-y-4 animate-in fade-in">
                
                {/* Result Top Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      Analysis Result: High Risk Markers Detected
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">Risk Score:</span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-red-100 text-red-800 border border-red-200 font-mono">
                      {selectedPreset.riskScore} / 100
                    </span>
                  </div>
                </div>

                {/* Warning Signs List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Identified Warning Flags:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedPreset.detectedSigns.map((sign, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{sign}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plain-Language Explanation */}
                <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#123B70] block mb-1">Plain Language Explanation:</strong>
                  {selectedPreset.explanation}
                </div>

                {/* Recommended Immediate Action */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 font-bold">Recommended Safety Step: </strong>
                    {selectedPreset.recommendedAction}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
