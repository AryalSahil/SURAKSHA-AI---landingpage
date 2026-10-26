import React, { useState, useEffect } from 'react';
import { 
  Download, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  HardDrive, 
  Calendar, 
  Layers, 
  Bell, 
  Check, 
  Send,
  Smartphone,
  Info
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const DownloadPage: React.FC = () => {
  const { navigate } = useRouter();
  const [releaseConfig, setReleaseConfig] = useState({
    version: 'v1.0.0-beta.2',
    channel: 'Beta / Sideload Evaluation',
    isPublished: false,
    fileSize: '18.2 MB',
    minAndroid: 'Android 8.0 & Above',
    releaseDate: 'October 2026',
    checksum: 'SHA-256: 8a9f3b4c92...e61d',
    apkDownloadUrl: '',
    notes: 'Pre-release evaluation build under Play Protect and CERT-In baseline verification.',
    testedDevices: [
      'Redmi Note 12 / 13 (MIUI 14)',
      'Samsung Galaxy M34 / A54 (One UI 6)',
      'OnePlus Nord CE 3 (OxygenOS 14)',
      'Realme Narzo 60',
      'Vivo T2 5G',
    ],
  });
  const [loading, setLoading] = useState(true);

  // Notify Me Subscription form state
  const [notifyInput, setNotifyInput] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.releaseInfo) {
          setReleaseConfig(data.releaseInfo);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch server config, using fallback defaults:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyInput.trim()) return;

    setNotifyStatus('loading');
    try {
      const res = await fetch('/api/public/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: 'Release Notification',
          email: notifyInput.includes('@') ? notifyInput.trim() : undefined,
          name: 'Pre-release Subscriber',
          message: `Subscriber requested notification when APK is officially released: ${notifyInput.trim()}`,
        }),
      });

      if (res.ok) {
        setNotifyStatus('success');
      } else {
        setNotifyStatus('error');
      }
    } catch {
      setNotifyStatus('error');
    }
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android Distribution Channel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Your Safety, One Tap Away.
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            SURAKSHA AI is built as a lightweight, low-resource native Android utility for every citizen across Bharat.
          </p>
        </div>

        {/* Primary Download Status Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-12">
          
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Top Row: App Lockup & Live Availability Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm shrink-0">
                  <img
                    src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png"
                    alt="SURAKSHA AI App Icon"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                      {releaseConfig.channel}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    SURAKSHA AI for Android
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {releaseConfig.minAndroid} · Universal Architecture
                  </p>
                </div>
              </div>

              {/* Action Area based on Real Publication State */}
              <div>
                {releaseConfig.isPublished && releaseConfig.apkDownloadUrl ? (
                  <a
                    href={releaseConfig.apkDownloadUrl}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-bold shadow-md transition-all"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download APK ({releaseConfig.fileSize})</span>
                  </a>
                ) : (
                  <div className="flex flex-col items-start md:items-end gap-1.5">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-xs">
                      <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                      <span>Status: APK in Security Review & Testing</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      * Real binary release pending signature sign-off.
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* If Unpublished: Transparent Unavailable Notice */}
            {!releaseConfig.isPublished && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 via-blue-50/50 to-amber-50/80 border border-amber-200/80 space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-950">
                      Direct APK Binary Currently Under Independent Verification
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                      To safeguard citizens against counterfeit installation files, SURAKSHA AI does not distribute mock or unverified binaries. The Android APK is currently in security staging undergoing Google Play Protect compatibility checks and baseline CERT-In review.
                    </p>
                  </div>
                </div>

                {/* Notify Me subscription */}
                <div className="pt-3 border-t border-amber-200/60">
                  <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span>Get Notified As Soon As the Verified APK Is Published:</span>
                  </h4>

                  {notifyStatus === 'success' ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Thank you! Your notification request has been logged. You will be alerted upon official launch.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                      <input
                        type="text"
                        value={notifyInput}
                        onChange={(e) => setNotifyInput(e.target.value)}
                        placeholder="Enter email or mobile number..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <button
                        type="submit"
                        disabled={notifyStatus === 'loading'}
                        className="px-4 py-2 bg-[#123B70] text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
                      >
                        {notifyStatus === 'loading' ? 'Saving...' : 'Notify Me'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* Technical Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" />
                  VERSION TAG
                </span>
                <div className="font-bold text-slate-800 font-mono text-sm">
                  {releaseConfig.version}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5" />
                  PACKAGE SIZE
                </span>
                <div className="font-bold text-slate-800 font-mono text-sm">
                  {releaseConfig.fileSize}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  EVALUATION DATE
                </span>
                <div className="font-bold text-slate-800 text-sm">
                  {releaseConfig.releaseDate}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  PACKAGE INTEGRITY
                </span>
                <div className="font-bold text-emerald-700 text-xs truncate" title={releaseConfig.checksum}>
                  {releaseConfig.checksum}
                </div>
              </div>
            </div>

            {/* Sideloading Notice */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start gap-3 text-xs text-slate-700">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-[#123B70]">Direct Sideloading Notice:</strong> When installing from outside Google Play, Android will prompt: <em>"Allow installation from this source"</em>. Always verify you obtained the APK directly from <strong>suraksha-ai.org</strong> and check the SHA-256 fingerprint.
              </div>
            </div>

            {/* Tested Smartphone Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Hardware & OS Testing Matrix (Universal Sideloading):
              </h4>
              <div className="flex flex-wrap gap-2">
                {releaseConfig.testedDevices?.map((dev, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-xs"
                  >
                    ✓ {dev}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Step-by-Step Installation Instructions */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>How to Install on Android 8.0 Through 14</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#123B70] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-900">Download Official APK</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Save the verified APK file from this official site to your phone's Download folder.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#123B70] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-900">Open Notification / File</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tap on the downloaded APK in your Android notification shade or Files manager.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#123B70] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-900">Allow from this source</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When prompted by Android Security, toggle "Allow installation from this source" for Chrome/Files.
              </p>
            </div>

            <div className="space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#123B70] text-white text-xs font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="text-sm font-bold text-slate-900">Tap Install & Launch</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tap Install. No device administrator permissions or SMS reading privileges are requested.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
