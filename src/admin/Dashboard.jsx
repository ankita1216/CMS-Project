import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchInquiries } from '../lib/api';
import AdminLayout from './AdminLayout';
import { 
  Building2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Loader2,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalInquiries: 0,
    unreadInquiries: 0,
    featuredProjects: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [projectsList, inquiriesList] = await Promise.all([
        fetchProjects(),
        fetchInquiries()
      ]);

      const featured = projectsList.filter(p => p.is_featured).length;
      const unread = inquiriesList.filter(i => !i.is_read).length;

      setStats({
        totalProjects: projectsList.length,
        totalInquiries: inquiriesList.length,
        unreadInquiries: unread,
        featuredProjects: featured
      });
      setRecentInquiries(inquiriesList.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Portfolio Projects', 
      value: stats.totalProjects, 
      icon: Building2, 
      color: 'gold',
      path: '/admin/projects',
      desc: 'Active real estate listings'
    },
    { 
      label: 'Visitor Leads', 
      value: stats.totalInquiries, 
      icon: MessageSquare, 
      color: 'purple',
      path: '/admin/inquiries',
      desc: 'Total contact submissions'
    },
    { 
      label: 'Unread Inquiries', 
      value: stats.unreadInquiries, 
      icon: Clock, 
      color: 'orange',
      path: '/admin/inquiries',
      desc: 'Require immediate callback'
    },
    { 
      label: 'Featured Homes', 
      value: stats.featuredProjects, 
      icon: Star, 
      color: 'green',
      path: '/admin/projects',
      desc: 'Highlighted on homepage'
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-white/40">
          <Loader2 className="animate-spin text-gold-primary" size={40} />
          <p className="text-xs uppercase tracking-widest">Opening Secure Core...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border/40 pb-6">
          <div>
            <h2 className="text-3xl font-display font-bold text-white tracking-wide">Welcome Back, Administrator</h2>
            <p className="text-white/40 text-xs uppercase tracking-wider mt-1">Aurum Estates Operational Hub</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase bg-gold-primary/5 text-gold-primary border border-gold-primary/20 px-4 py-2 rounded-full font-bold">
            <ShieldCheck size={14} /> SYSTEM: OPERATIONAL
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            
            const colorMap = {
              gold: 'bg-gold-primary/10 text-gold-primary border-gold-primary/20',
              purple: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
              orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
              green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link 
                  to={card.path}
                  className="block bg-dark-secondary border border-dark-border/60 p-6 rounded-xl hover:border-gold-primary/30 transition-all duration-300 relative overflow-hidden group shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-lg border ${colorMap[card.color]}`}>
                      <Icon size={22} />
                    </div>
                    <div className="text-white/20 group-hover:text-gold-primary transition-colors">
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{card.label}</p>
                    <h3 className="text-3xl font-display font-bold text-white mt-1.5 tracking-tight group-hover:text-gold-primary transition-colors">
                      {card.value}
                    </h3>
                    <p className="text-[10px] text-white/30 mt-2 font-light">{card.desc}</p>
                  </div>

                  {/* Corner shine highlight */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gold-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Inquiries Panel */}
          <div className="lg:col-span-2 bg-dark-secondary border border-dark-border/60 rounded-xl overflow-hidden shadow-lg">
            <div className="p-6 border-b border-dark-border/40 flex items-center justify-between bg-dark-secondary/80">
              <h3 className="text-sm uppercase tracking-widest font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} className="text-gold-primary" /> Recent Leads Inflow
              </h3>
              <Link to="/admin/inquiries" className="text-gold-primary text-xs uppercase tracking-widest font-bold hover:text-gold-light flex items-center gap-1 transition-colors">
                View All Leads <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="divide-y divide-dark-border/40">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry, i) => (
                  <motion.div 
                    key={inquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-6 hover:bg-dark-primary/30 transition-all flex items-start gap-4 relative ${
                      !inquiry.is_read ? 'border-l-2 border-gold-primary pl-[22px]' : ''
                    }`}
                  >
                    {/* User initial bubble */}
                    <div className="w-10 h-10 rounded-full border border-dark-border bg-dark-primary flex items-center justify-center font-display font-semibold text-gold-primary text-sm flex-shrink-0">
                      {inquiry.name.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-semibold text-white tracking-wide text-sm">{inquiry.name}</p>
                          <p className="text-xs text-white/40 mt-0.5">{inquiry.email} • {inquiry.phone}</p>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-white/30 flex-shrink-0">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white/60 italic leading-relaxed mt-3 line-clamp-1 border-l border-dark-border pl-3">
                        "{inquiry.message}"
                      </p>
                      
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[8px] bg-dark-primary border border-dark-border text-white/40 px-2 py-0.5 uppercase tracking-widest font-bold">
                          {inquiry.projects?.title || 'General Inquiry'}
                        </span>
                        {!inquiry.is_read && (
                          <span className="text-[8px] bg-gold-primary/10 border border-gold-primary/20 text-gold-primary px-2 py-0.5 uppercase tracking-widest font-bold">
                            New Lead
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-16 text-center text-white/30">
                  <MessageSquare className="mx-auto mb-3 opacity-20 text-gold-primary" size={36} />
                  <p className="text-xs uppercase tracking-widest">No inquiries received yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Panel & System Health */}
          <div className="space-y-6">
            
            {/* Elegant Luxury Callout Box */}
            <div className="bg-gradient-to-br from-dark-secondary to-[#1c1a16] border border-gold-primary/20 p-6 rounded-xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <h3 className="text-lg font-display font-bold text-white tracking-wide">Quick Operations</h3>
                <p className="text-white/50 text-xs leading-relaxed">Manage listings and review visitor requests instantly.</p>
                
                <div className="pt-4 space-y-3">
                  <Link 
                    to="/admin/projects" 
                    className="block w-full bg-gold-primary text-dark-primary hover:bg-gold-light py-3 px-4 rounded text-center text-xs uppercase tracking-widest font-bold transition-all shadow-lg active:scale-95 shadow-gold-primary/5"
                  >
                    Add Portfolio Project
                  </Link>
                  <Link 
                    to="/admin/inquiries" 
                    className="block w-full bg-transparent border border-dark-border hover:border-white/20 py-3 px-4 rounded text-center text-xs uppercase tracking-widest font-semibold transition-all text-white/80"
                  >
                    Manage Customer Leads
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gold-primary/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* System Status Indicators */}
            <div className="bg-dark-secondary border border-dark-border/60 p-6 rounded-xl space-y-5 shadow-md">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white border-b border-dark-border/30 pb-3">
                System Integration
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Express backend API</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div> Online
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">PostgreSQL DB (Supabase)</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Operational
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Supabase Media Storage</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Public
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
