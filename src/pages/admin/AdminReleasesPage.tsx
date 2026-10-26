import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  Save, 
  RefreshCw, 
  Shield, 
  ExternalLink,
  Hash,
  FileCheck,
  Cpu,
  Info
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const AdminReleasesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [releaseInfo, setReleaseInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [isPublished, setIsPublished] = useState(false);
  const [version, setVersion] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [minAndroid, setMinAndroid] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [checksum, setChecksum] = useState('');
  const [apkDownloadUrl, setApkDownloadUrl] = useState('');
  const [notes, setNotes] = useState('');

  const fetchRelease = async () => {
    try {
      const res = await fetch('/api/admin/releases');
      if (!res.ok) throw new Error('Failed to load release info');
      const data = await res.json();
      const r = data.releaseInfo;
      setReleaseInfo(r);
      setIsPublished(r.isPublished || false);
      setVersion(r.version || '');
      setFileSize(r.fileSize || '');
      setMinAndroid(r.minAndroid || '');
      setReleaseDate(r.releaseDate || '');
      setChecksum(r.checksum || '');
      setApkDownloadUrl(r.apkDownloadUrl || '');
      setNotes(r.notes || '');
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error fetching release info' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelease();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/admin/releases', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isPublished,
          version,
          fileSize,
          minAndroid,
          releaseDate,
          checksum,
          apkDownloadUrl: apkDownloadUrl.trim() || undefined,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update release');

      setStatusMessage({
        type: 'success',
        text: `Release configuration updated successfully! Public download status: ${isPublished ? 'PUBLISHED' : 'IN REVIEW / UNAVAILABLE'}.`,
      });
      fetchRelease();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating release' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Android APK Distribution</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure release metadata, SHA-256 verification hash, and publication availability.
          </p>
        </div>
        <button
          onClick={() => navigate('/download')}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <span>View Public Download Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Governance Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex items-start justify-between pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">APK Publication State</h2>
            <p className="text-xs text-slate-500 mt-1">
              Toggle whether the public website presents a direct APK download or displays the security audit review state.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isPublished
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isPublished ? 'Publicly Available' : 'In Review & Testing'}
            </span>
            <button
              type="button"
              onClick={() => setIsPublished(!isPublished)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isPublished ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isPublished ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Informational Guidance Box */}
        <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
          isPublished 
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50/70 border-amber-200 text-amber-900'
        }`}>
          <Info className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block mb-0.5">
              {isPublished ? 'Live Binary Active' : 'Sideload Security Precaution Active'}
            </strong>
            {isPublished ? (
              <span>The APK is marked published. Users on the public website can trigger downloads using the configured URL.</span>
            ) : (
              <span>The APK is marked unavailable / undergoing evaluation. The public download page explicitly tells citizens the application is undergoing final security testing, displaying test requirements rather than a dead or fraudulent button.</span>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Release Version
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="1.1.0"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="18.2 MB"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Android OS
              </label>
              <input
                type="text"
                value={minAndroid}
                onChange={(e) => setMinAndroid(e.target.value)}
                placeholder="Android 8.0 (API 26) or higher"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Release Date
              </label>
              <input
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                placeholder="March 2026"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>SHA-256 Checksum Hash</span>
              <span className="text-[11px] text-slate-400 font-normal">For citizen sideload integrity validation</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={checksum}
                onChange={(e) => setChecksum(e.target.value)}
                placeholder="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Binary Download URL (Optional - only when published)
            </label>
            <input
              type="text"
              value={apkDownloadUrl}
              onChange={(e) => setApkDownloadUrl(e.target.value)}
              placeholder="https://releases.suraksha-ai.internal/apk/suraksha-ai-v1.1.apk"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Release Notes & Changelog
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Summary of bug fixes, new scam models, or performance optimizations..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Changes...' : 'Save Release Configuration'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tested Devices Matrix Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-600" />
          <span>Verified Device Testing Matrix</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {releaseInfo?.testedDevices?.map((dev: any, i: number) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="font-semibold text-slate-800">{dev.model}</div>
              <div className="text-slate-500 mt-0.5">{dev.os}</div>
              <div className="mt-2 text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{dev.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
