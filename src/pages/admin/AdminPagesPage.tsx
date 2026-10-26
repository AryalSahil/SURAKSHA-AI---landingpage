import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Clock
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface PageItem {
  id: string;
  path: string;
  title: string;
  description: string;
  isPublished: boolean;
  lastModified: string;
}

export const AdminPagesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      if (!res.ok) throw new Error('Failed to load pages');
      const data = await res.json();
      setPages(data.pages || []);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error fetching pages' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleToggle = async (page: PageItem) => {
    setUpdatingId(page.id);
    setMessage(null);
    const newStatus = !page.isPublished;

    try {
      const res = await fetch(`/api/admin/pages/${page.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update page status');
      }

      setPages((prev) =>
        prev.map((p) => (p.id === page.id ? { ...p, isPublished: newStatus, lastModified: new Date().toISOString() } : p))
      );
      setMessage({
        type: 'success',
        text: `"${page.title}" status changed to ${newStatus ? 'Published' : 'Draft'}.`,
      });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error updating status' });
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredPages = pages.filter((p) => {
    if (filter === 'published') return p.isPublished;
    if (filter === 'draft') return !p.isPublished;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Public Pages Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Control publication visibility and monitor public access across all 10 citizen portals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({pages.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filter === 'published' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Published ({pages.filter((p) => p.isPublished).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                filter === 'draft' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts ({pages.filter((p) => !p.isPublished).length})
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading pages configuration...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Page Name & Route</th>
                  <th className="py-3.5 px-6">Description</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Last Updated</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{page.title}</div>
                          <div className="text-xs font-mono text-blue-600">{page.path}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 max-w-xs text-xs text-slate-500">
                      {page.description}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          page.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            page.isPublished ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(page.lastModified).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Toggle Status Switch */}
                        <button
                          type="button"
                          onClick={() => handleToggle(page)}
                          disabled={updatingId === page.id}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden disabled:opacity-50 ${
                            page.isPublished ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}
                          title={`Toggle ${page.title}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              page.isPublished ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        {/* View Live Page */}
                        <button
                          onClick={() => navigate(page.path)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                          title="View live public page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
        <span>Public pages are accessible by citizen browsers when set to <strong>Published</strong>.</span>
        <span>Automatic change logs are registered to the audit log.</span>
      </div>
    </div>
  );
};
