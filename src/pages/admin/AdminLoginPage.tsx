import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, AlertCircle, ArrowRight, ShieldAlert, KeyRound } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const AdminLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to /admin
    fetch('/api/admin/me')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
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
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      // Successful login
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Unable to authenticate. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('SurakshaSecure@2026');
    setError(null);
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
                  className="w-full pl-10 pr-4 py-3 bg-[#0A192F]/80 border border-blue-900/60 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full pl-10 pr-4 py-3 bg-[#0A192F]/80 border border-blue-900/60 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-blue-800/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Demo / Hackathon Evaluation Access:</span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="bg-[#0A192F]/60 rounded-lg p-2.5 border border-blue-900/40 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>admin</span>
              <span className="text-slate-500">/</span>
              <span>SurakshaSecure@2026</span>
            </div>
          </div>
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
            Protected system. All administrator actions, logins, and status changes are permanently logged to the audit log.
          </p>
        </div>
      </div>
    </div>
  );
};
