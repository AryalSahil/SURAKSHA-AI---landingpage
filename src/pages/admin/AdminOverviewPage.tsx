import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Smartphone, 
  Bell, 
  MessageSquare, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  Shield, 
  RefreshCw,
  Server,
  Zap
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { apiFetch } from '../../utils/api';

export const AdminOverviewPage: React.FC = () => {
  const { navigate } = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchOverview = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    setActionError(null);
    try {
      const json = await apiFetch('/api/admin/overview');
      setData(json);
    } catch (err: any) {
      setActionError(err.message || 'Error communicating with server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const toggleMaintenance = async () => {
    if (!data?.siteSettings) return;
    const newStatus = !data.siteSettings.maintenanceMode;
    try {
      await apiFetch('/api/admin/settings', {
        method: 'PATCH',
        body: JSON.stringify({ maintenanceMode: newStatus }),
      });
      fetchOverview();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleApkPublish = async () => {
    if (!data?.releaseInfo) return;
    const newStatus = !data.releaseInfo.isPublished;
    try {
      await apiFetch('/api/admin/releases', {
        method: 'PATCH',
        body: JSON.stringify({ isPublished: newStatus }),
      });
      fetchOverview();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const recentLogs = data?.recentLogs || [];

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status of SURAKSHA AI public assets, release binaries, and citizen interactions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchOverview(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {actionError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Public Pages */}
        <div 
          onClick={() => navigate('/admin/pages')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Public Pages</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics.publishedPages} / {metrics.totalPages}</div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            <span>Published / Live</span>
            <span className="text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 2: APK Release State */}
        <div 
          onClick={() => navigate('/admin/releases')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Android APK Distribution</span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
              metrics.apkPublished ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white'
            }`}>
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl font-bold ${metrics.apkPublished ? 'text-emerald-700' : 'text-amber-700'}`}>
              {metrics.apkPublished ? 'Live & Downloadable' : 'In Review / Sideload'}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            <span>Version: v{metrics.currentVersion}</span>
            <span className="text-cyan-700 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Configure <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 3: Active Bulletins */}
        <div 
          onClick={() => navigate('/admin/announcements')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Citizen Bulletins</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics.activeAnnouncementsCount}</div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            <span>Active Citizen Advisories</span>
            <span className="text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Review <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 4: Citizen Submissions */}
        <div 
          onClick={() => navigate('/admin/feedbacks')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Feedback & Reports</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics.totalFeedbackCount}</div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            <span className="text-amber-600 font-medium">{metrics.unresolvedFeedbackCount} new submissions</span>
            <span className="text-teal-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              Inspect <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Control Switchboard & Status Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Governance Toggles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Operational Controls</span>
          </h2>

          {/* Maintenance Switch */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Maintenance Mode</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {metrics.maintenanceMode 
                  ? 'Active: Public sees maintenance alert banner' 
                  : 'Inactive: All public services normal'}
              </div>
            </div>
            <button
              onClick={toggleMaintenance}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                metrics.maintenanceMode ? 'bg-amber-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  metrics.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* APK Published Switch */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-900">Publish APK Link</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {metrics.apkPublished 
                  ? 'Published: Download button is clickable' 
                  : 'In-Review: Download shows unavailable state'}
              </div>
            </div>
            <button
              onClick={toggleApkPublish}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                metrics.apkPublished ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  metrics.apkPublished ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Security & Integrity Note */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero-Deception Guarantee</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              When APK is unpublished, the public download page strictly displays real SHA-256 cryptographic hashes and sideload review status without generating dummy or misleading links.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Recent Activity Audit Stream */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-600" />
                <span>Recent Audit Activity</span>
              </h2>
              <button
                onClick={() => navigate('/admin/activity-logs')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                View all logs →
              </button>
            </div>

            {recentLogs.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No recent activity logged yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentLogs.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="py-3 flex items-start gap-3">
                    <div className="mt-0.5">
                      {log.severity === 'error' ? (
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      ) : log.severity === 'warning' ? (
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-800 font-mono">
                          {log.action}
                        </span>
                        <span className="text-[11px] text-slate-400 shrink-0">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5">{log.details}</p>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        By <span className="font-medium text-slate-600">{log.performedBy}</span>
                        {log.ip && ` • ${log.ip}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              Express Engine with JSON persistence
            </span>
            <span>Port 3000 / Production Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
