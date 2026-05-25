import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';
import { clearDummyAdminSession } from '../hooks/useAuth';
import { 
  LayoutDashboard, 
  Building2, 
  MessageSquare, 
  LogOut, 
  Home,
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    clearDummyAdminSession();
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    navigate('/admin');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Building2 },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-dark-primary text-offWhite flex font-sans overflow-x-hidden">
      {/* Sleek Dark Gold Sidebar */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-dark-secondary border-r border-dark-border/60 flex flex-col fixed inset-y-0 z-50 shadow-xl"
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-dark-border/40 h-20">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <Link to="/" className="group">
                  <span className="text-lg font-display font-bold tracking-widest text-white group-hover:text-gold-primary transition-colors">
                    AURUM
                  </span>
                  <span className="text-[8px] tracking-[0.3em] text-gold-primary block uppercase -mt-1 font-semibold">
                    Estates Admin
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto"
              >
                <Link to="/">
                  <span className="text-xl font-display font-bold text-gold-primary">A</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-white/5 rounded-lg border border-dark-border/40 hover:border-gold-primary/20 transition-all text-white/60 hover:text-gold-primary"
          >
            {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-grow px-4 mt-8 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative flex items-center py-2"
              >
                <div 
                  className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-lg transition-all relative z-10 ${
                    isActive 
                      ? 'text-dark-primary font-bold' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-dark-primary' : 'text-gold-primary/80'} />
                  {isSidebarOpen && <span className="text-xs uppercase tracking-widest font-semibold">{item.name}</span>}
                </div>
                {/* Under-bar active animation */}
                {isActive && (
                  <motion.div 
                    layoutId="active-admin-nav" 
                    className="absolute inset-0 bg-gold-primary rounded-lg shadow-lg shadow-gold-primary/10" 
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-dark-border/40 space-y-2 bg-dark-secondary">
          <Link
            to="/"
            className="flex items-center gap-4 px-4 py-3.5 rounded-lg text-white/50 hover:bg-white/5 hover:text-gold-primary transition-all text-xs uppercase tracking-widest font-semibold"
          >
            <Home size={18} className="text-gold-primary/60" />
            {isSidebarOpen && <span>View Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all text-xs uppercase tracking-widest font-semibold"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main 
        animate={{ marginLeft: isSidebarOpen ? 260 : 80 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-grow min-h-screen flex flex-col"
      >
        {/* Dynamic Premium Header */}
        <header className="bg-dark-secondary/60 backdrop-blur-xl border-b border-dark-border/40 h-20 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-gold-primary animate-pulse" />
            {menuItems.find(item => item.path === location.pathname)?.name || 'Admin Management'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 border border-dark-border/60 bg-dark-primary/60 rounded-full">
              <div className="w-8 h-8 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary text-xs font-bold">
                AD
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Logged in as</p>
                <p className="text-xs font-semibold text-white tracking-wide mt-1">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Pages Output */}
        <div className="p-8 md:p-10 flex-grow bg-gradient-to-br from-dark-primary via-[#0d0d0d] to-dark-secondary">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
