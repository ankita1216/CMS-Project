import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AdminLayout from './AdminLayout';
import { 
  Building2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      // Fetch stats in parallel
      const [projectsCount, inquiriesCount, unreadCount, featuredCount, recentData] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setStats({
        totalProjects: projectsCount.count || 0,
        totalInquiries: inquiriesCount.count || 0,
        unreadInquiries: unreadCount.count || 0,
        featuredProjects: featuredCount.count || 0
      });
      setRecentInquiries(recentData.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: 'Total Projects', 
      value: stats.totalProjects, 
      icon: Building2, 
      color: 'blue',
      path: '/admin/projects'
    },
    { 
      label: 'Total Inquiries', 
      value: stats.totalInquiries, 
      icon: MessageSquare, 
      color: 'purple',
      path: '/admin/inquiries'
    },
    { 
      label: 'Unread Leads', 
      value: stats.unreadInquiries, 
      icon: Clock, 
      color: 'orange',
      path: '/admin/inquiries'
    },
    { 
      label: 'Featured', 
      value: stats.featuredProjects, 
      icon: CheckCircle2, 
      color: 'green',
      path: '/admin/projects'
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="h-[60vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back, Admin</h2>
          <p className="text-slate-500 mt-1">Here's what's happening with your properties today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card) => {
            const Icon = card.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600',
              purple: 'bg-purple-50 text-purple-600',
              orange: 'bg-orange-50 text-orange-600',
              green: 'bg-green-50 text-green-600',
            };
            return (
              <Link 
                key={card.label} 
                to={card.path}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${colorClasses[card.color]}`}>
                    <Icon size={24} />
                  </div>
                  <TrendingUp size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{card.value}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Inquiries */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Recent Inquiries</h3>
              <Link to="/admin/inquiries" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentInquiries.length > 0 ? (
                recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-800">{inquiry.name}</p>
                        <p className="text-sm text-slate-500">{inquiry.email} • {inquiry.phone}</p>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-1 italic">"{inquiry.message}"</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        inquiry.is_read ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {inquiry.is_read ? 'Read' : 'New'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-400">
                  <MessageSquare className="mx-auto mb-2 opacity-20" size={40} />
                  <p>No inquiries found</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <h3 className="text-lg font-bold">Quick Actions</h3>
              <p className="text-blue-100 text-sm mt-1">Manage your listings efficiently.</p>
              <div className="mt-6 space-y-3">
                <Link 
                  to="/admin/projects" 
                  className="block w-full bg-white/10 hover:bg-white/20 py-3 px-4 rounded-xl text-center font-medium transition-all"
                >
                  Add New Project
                </Link>
                <Link 
                  to="/admin/inquiries" 
                  className="block w-full bg-white text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl text-center font-bold transition-all"
                >
                  Manage Inquiries
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Database</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div> Connected
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Storage</span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div> Operational
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
