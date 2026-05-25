import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import {
  DUMMY_ADMIN_EMAIL,
  DUMMY_ADMIN_PASSWORD,
  setDummyAdminSession,
  useAuth,
} from '../hooks/useAuth';
import { LogIn, Mail, Lock, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { session } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigate('/admin/dashboard');
    }
  }, [session, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (email.trim() === DUMMY_ADMIN_EMAIL && password === DUMMY_ADMIN_PASSWORD) {
        setDummyAdminSession();
        navigate('/admin/dashboard');
        return;
      }

      if (!isSupabaseConfigured) {
        throw new Error(`Use dummy login: ${DUMMY_ADMIN_EMAIL} / ${DUMMY_ADMIN_PASSWORD}`);
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-primary px-4 py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 bg-dark-secondary/60 backdrop-blur-xl p-10 border border-dark-border/80 shadow-2xl relative z-10"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center shadow-lg shadow-gold-primary/5 mb-6">
            <LogIn className="h-7 w-7 text-gold-primary" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-wide uppercase">
            AURUM ESTATES
          </h2>
          <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
            Secure Admin Dashboard
          </p>
          <div className="mt-4 rounded bg-dark-primary/60 border border-dark-border/40 px-4 py-3 text-[10px] uppercase tracking-widest text-white/50 space-y-1">
            <p className="font-light">Credentials (Mock Mode)</p>
            <p className="font-bold text-gold-primary">{DUMMY_ADMIN_EMAIL} <span className="text-white/30">/</span> {DUMMY_ADMIN_PASSWORD}</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="email-address" className="block text-[9px] uppercase tracking-widest text-white/40">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-white/30" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-dark-primary border border-dark-border/60 hover:border-dark-border text-white text-sm focus:border-gold-primary outline-none transition-colors"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-[9px] uppercase tracking-widest text-white/40">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-white/30" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-dark-primary border border-dark-border/60 hover:border-dark-border text-white text-sm focus:border-gold-primary outline-none transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-primary hover:bg-gold-light text-dark-primary py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-primary/5 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <><Sparkles size={14} /> Open Portal</>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
