import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Star, 
  Calendar, 
  Filter, 
  RefreshCw,
  User,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface FeedbackItem {
  id: string;
  name?: string;
  email?: string;
  category: string;
  device?: string;
  rating?: number;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export const AdminFeedbacksPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const fetchFeedbacks = async () => {
    try {
      const data = await apiFetch('/api/admin/feedbacks');
      setFeedbacks(data.feedbacks || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const categories = ['all', ...Array.from(new Set(feedbacks.map((f) => f.category)))];

  const filteredFeedbacks = feedbacks.filter((f) => {
    if (filterCategory !== 'all' && f.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Citizen Feedback & Scam Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real incoming inquiries, community scam trend reports, and testing feedback from Indian citizens.
          </p>
        </div>
        <button
          onClick={fetchFeedbacks}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold mr-1">
          <Filter className="w-3 h-3" /> Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              filterCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Submissions' : cat}
          </button>
        ))}
      </div>

      {/* Feedbacks list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading submissions...
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-800">No citizen submissions in this category.</p>
            <p className="text-xs text-slate-400 mt-1">
              Feedback submitted through the public Contact page arrives here instantly.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredFeedbacks.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors space-y-3">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      {item.name || 'Anonymous Citizen'}
                    </span>

                    {item.email && (
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {item.email}
                      </span>
                    )}

                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {item.category}
                    </span>

                    {item.device && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Smartphone className="w-3 h-3 text-slate-400" />
                        {item.device}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    {item.rating && (
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed border border-slate-100">
                  {item.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
