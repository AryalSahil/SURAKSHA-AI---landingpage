import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  Calendar,
  X,
  Megaphone
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface Announcement {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'urgent';
  category: string;
  summary: string;
  isPublished: boolean;
  createdAt: string;
}

export const AdminAnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<'info' | 'warning' | 'urgent'>('warning');
  const [category, setCategory] = useState('Citizen Advisory');
  const [summary, setSummary] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const data = await apiFetch('/api/admin/announcements');
      setAnnouncements(data.announcements || []);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error fetching announcements' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      await apiFetch(`/api/admin/announcements/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublished: !currentStatus }),
      });
      fetchAnnouncements();
      setStatusMessage({
        type: 'success',
        text: `Announcement visibility changed.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleDelete = async (id: string, titleStr: string) => {
    if (!confirm(`Are you sure you want to delete bulletin "${titleStr}"?`)) return;
    try {
      await apiFetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE',
      });
      fetchAnnouncements();
      setStatusMessage({
        type: 'success',
        text: `Bulletin deleted.`,
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Please fill in title and summary.');
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch('/api/admin/announcements', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim(),
          severity,
          category: category.trim(),
          summary: summary.trim(),
          isPublished,
        }),
      });
      
      setTitle('');
      setSummary('');
      setShowModal(false);
      fetchAnnouncements();
      setStatusMessage({
        type: 'success',
        text: 'New Citizen Bulletin broadcasted successfully!',
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Citizen Safety Bulletins</h1>
          <p className="text-sm text-slate-500 mt-1">
            Broadcast emergency alerts, trending scam warnings, and safety advisories across the public website.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Citizen Bulletin</span>
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

      {/* Announcements List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading bulletins...
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Megaphone className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-800">No active advisories or bulletins.</p>
            <p className="text-xs text-slate-400 mt-1">Click "New Citizen Bulletin" to broadcast a safety notification.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {announcements.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                        item.severity === 'urgent'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : item.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {item.severity === 'urgent' && <ShieldAlert className="w-3 h-3" />}
                      {item.severity === 'warning' && <AlertTriangle className="w-3 h-3" />}
                      {item.severity === 'info' && <Info className="w-3 h-3" />}
                      <span>{item.severity}</span>
                    </span>

                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {item.isPublished ? 'Published' : 'Hidden'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggle(item.id, item.isPublished)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        item.isPublished ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          item.isPublished ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete bulletin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Bell className="w-5 h-5 text-blue-600" />
                <span>Create Citizen Safety Bulletin</span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bulletin Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Alert: Fake Electricity Bill Disconnection SMS"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Severity
                  </label>
                  <select
                    value={severity}
                    onChange={(e: any) => setSeverity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info / Tip</option>
                    <option value="warning">Warning / Advisory</option>
                    <option value="urgent">Urgent / Red Alert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Utility Scam, UPI Trap"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Summary & Action Guidance
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Clear, citizen-friendly explanation of what the scam does and how citizens should react..."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Publish immediately to public landing page banner</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Broadcasting...' : 'Publish Bulletin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
