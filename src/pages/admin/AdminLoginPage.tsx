import React, { useState, useEffect } from 'react';
import { Lock, User, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { apiFetch, setAdminToken } from '../../utils/api';

export const AdminLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated with a valid session, redirect to /admin
    apiFetch('/api/admin/me')
      .then((data) => {
        if (data?.authenticated) {
          navigate('/admin');
        }
      })
      .catch(() => {
        // Not authenticated, stay on login page
      });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const data = await apiFetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (data?.token) {
        setAdminToken(data.token);
      }

      // Successful login - navigate to dashboard
      navigate('/admin');
    } catch (err: any) {
      // User-friendly error message, avoiding low-level browser JSON exceptions
      const msg = err?.message || '';
      if (msg.includes('Unexpected end of JSON') || msg.includes('Failed to execute')) {
        setError('Connection interrupted. Please verify credentials and retry.');
      } else {
        setError(msg || 'Unable to authenticate. Please check credentials.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] via-[#0D2140] to-[#0A192F] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-blue-900/30 mb-4 border border-blue-100 p-2">
            <img 
              src="/assets/aistudio/Suraksha_AI_Cybersecurity_Logo_f45da8e9.png" 
              alt="SURAKSHA AI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SURAKSHA AI Console</h1>
          <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mt-1">
            Authorized Administrator Control Plane
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#10233D]/90 backdrop-blur-xl border border-blue-800/40 rounded-2xl shadow-2xl p-7 sm:p-8">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-blue-800/30">
            <Lock className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Sign In to Dashboard</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/50 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Administrator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#0A192F]/80 border border-blue-900/60 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 bg-[#0A192F]/80 border border-blue-900/60 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info & return link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            ← Return to Public Website
          </button>
          <p className="text-[11px] text-slate-500 mt-3">
            Protected system. All administrator actions and changes are securely audited.
          </p>
        </div>
      </div>
    </div>
  );
};
