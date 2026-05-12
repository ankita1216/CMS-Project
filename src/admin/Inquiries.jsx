import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import AdminLayout from './AdminLayout';
import { 
  MessageSquare, 
  Search, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar,
  Loader2,
  AlertCircle,
  Eye,
  X
} from 'lucide-react';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*, projects(title)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ is_read: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry({ ...selectedInquiry, is_read: !currentStatus });
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      fetchInquiries();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>{inquiries.filter(i => !i.is_read).length} Unread Leads</span>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Visitor</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Interested In</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                      Loading inquiries...
                    </td>
                  </tr>
                ) : filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry) => (
                    <tr 
                      key={inquiry.id} 
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${!inquiry.is_read ? 'bg-blue-50/30' : ''}`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className={`font-semibold ${!inquiry.is_read ? 'text-blue-900' : 'text-slate-800'}`}>{inquiry.name}</p>
                          <p className="text-xs text-slate-500">{inquiry.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {inquiry.projects?.title || 'General Inquiry'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          inquiry.is_read ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {inquiry.is_read ? 'Read' : 'New Lead'}
                        </span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => toggleReadStatus(inquiry.id, inquiry.is_read)}
                            className={`p-2 rounded-lg transition-all ${
                              inquiry.is_read ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50' : 'text-blue-600 hover:bg-blue-100'
                            }`}
                            title={inquiry.is_read ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            {inquiry.is_read ? <Eye size={18} /> : <CheckCircle size={18} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(inquiry.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inquiry Detail Sidebar/Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">Inquiry Details</h3>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {/* Header Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold">
                    {selectedInquiry.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">{selectedInquiry.name}</h4>
                    <p className="text-slate-500">Submitted on {new Date(selectedInquiry.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-6 bg-slate-50 p-6 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-200">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                      <p className="font-medium text-slate-800">{selectedInquiry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-200">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                      <p className="font-medium text-slate-800">{selectedInquiry.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg text-slate-400 border border-slate-200">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interested Project</p>
                      <p className="font-medium text-slate-800">{selectedInquiry.projects?.title || 'General Inquiry'}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</h5>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl text-slate-700 leading-relaxed italic shadow-inner">
                    "{selectedInquiry.message}"
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                <button
                  onClick={() => toggleReadStatus(selectedInquiry.id, selectedInquiry.is_read)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedInquiry.is_read 
                      ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {selectedInquiry.is_read ? <Eye size={20} /> : <CheckCircle size={20} />}
                  {selectedInquiry.is_read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
