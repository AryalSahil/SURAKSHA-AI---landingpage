import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  RefreshCw, 
  Clock, 
  User, 
  ShieldCheck, 
  AlertTriangle, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { apiFetch } from '../../utils/api';

interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  details: string;
  severity: 'info' | 'warning' | 'error';
  ip?: string;
}

export const AdminActivityLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  const fetchLogs = async () => {
    try {
      const data = await apiFetch('/api/admin/activity-logs?limit=200');
      setLogs(data.logs || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (severityFilter !== 'all' && log.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.performedBy.toLowerCase().includes(q) ||
        (log.ip && log.ip.includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit & Activity Logs</h1>
          <p className="text-sm text-slate-500 mt-1">
            Chronological audit log recording administrative changes, authentication attempts, and publication states.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, administrator, IP or details..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
          {(['all', 'info', 'warning', 'error'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                severityFilter === s
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            Loading audit records...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="font-semibold text-slate-800">No logs matching query.</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or search term.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-5">Severity</th>
                  <th className="py-3 px-5">Timestamp</th>
                  <th className="py-3 px-5">Action Event</th>
                  <th className="py-3 px-5">Performed By</th>
                  <th className="py-3 px-5">IP Origin</th>
                  <th className="py-3 px-5">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 font-sans">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          log.severity === 'error'
                            ? 'bg-red-100 text-red-800'
                            : log.severity === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900 whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-sans whitespace-nowrap">
                      {log.performedBy}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 text-[11px] whitespace-nowrap">
                      {log.ip || '—'}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 font-sans max-w-md break-words">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
