import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Smartphone, 
  Bell, 
  Activity, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X, 
  ExternalLink,
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { currentPath, navigate } = useRouter();
  const [adminUser, setAdminUser] = useState<{ username: string; role: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Verify server session
    fetch('/api/admin/me')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        if (data.authenticated && data.user) {
          setAdminUser(data.user);
        } else {
          navigate('/admin/login');
        }
      })
      .catch(() => {
        navigate('/admin/login');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.warn('Logout network error:', e);
    }
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'overview', label: 'Overview Dashboard', path: '/admin', icon: LayoutDashboard },
    { id: 'pages', label: 'Public Pages Status', path: '/admin/pages', icon: FileText },
    { id: 'releases', label: 'APK Releases & Distribution', path: '/admin/releases', icon: Smartphone },
    { id: 'announcements', label: 'Citizen Safety Bulletins', path: '/admin/announcements', icon: Bell },
    { id: 'feedbacks', label: 'Citizen Reports & Feedback', path: '/admin/feedbacks', icon: MessageSquare },
    { id: 'activity-logs', label: 'Audit Activity Logs', path: '/admin/activity-logs', icon: Activity },
    { id: 'settings', label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">Verifying Administrator Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 select-none">
        
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <img
            src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png"
            alt="SURAKSHA AI Logo"
            className="w-9 h-9 object-contain rounded-xl bg-slate-800 p-0.5 border border-slate-700 shadow-sm"
          />
          <div>
            <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
              <span>SURAKSHA AI</span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded">
                ADMIN
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Control Console</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Live User & Sign out */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-slate-200 truncate">
              {adminUser?.name || 'Administrator'}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between mt-0.5">
              <span className="font-mono">@{adminUser?.username || 'admin'}</span>
              <span className="text-emerald-400 font-bold uppercase text-[9px]">• Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="End Secure Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              aria-label="Toggle admin sidebar"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Authenticated Admin Session:</span>
              <span className="text-white font-semibold capitalize font-mono">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Persistence Active</span>
            </div>

            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1 py-1.5 px-3 bg-slate-800 rounded-lg"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-400 font-mono">@{adminUser?.username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-red-950 text-red-300 text-xs font-semibold rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
