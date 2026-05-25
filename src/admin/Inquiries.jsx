import React, { useState, useEffect } from 'react';
import { fetchInquiries, updateInquiry, deleteInquiry } from '../lib/api';
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
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await fetchInquiries();
      setInquiries(data || []);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      await updateInquiry(id, { is_read: !currentStatus });
      loadInquiries();
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
      await deleteInquiry(id);
      loadInquiries();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err) {
      alert('Failed to delete inquiry');
    }
  };

  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Controls Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border/40 pb-6">
          <div className="relative flex-grow max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search visitor requests..."
              className="w-full pl-10 pr-4 py-3 bg-dark-primary border border-dark-border/60 hover:border-dark-border text-white text-xs uppercase tracking-wider focus:border-gold-primary outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase bg-gold-primary/5 text-gold-primary border border-gold-primary/20 px-4 py-2 rounded-full font-bold">
            <Sparkles size={14} /> {inquiries.filter(i => !i.is_read).length} Pending Calls
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-dark-secondary rounded-xl border border-dark-border/60 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-primary/60 border-b border-dark-border/40">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Client Profile</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Interested Listing</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Submission Date</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Status Badge</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/30">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-white/40">
                      <Loader2 className="animate-spin mx-auto mb-3 text-gold-primary" size={28} />
                      <span className="text-xs uppercase tracking-widest">Opening Secure Queue...</span>
                    </td>
                  </tr>
                ) : filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inquiry) => (
                    <tr 
                      key={inquiry.id} 
                      className={`hover:bg-dark-primary/20 transition-all cursor-pointer ${
                        !inquiry.is_read ? 'bg-gold-primary/5 pl-[22px]' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className={`font-bold tracking-wide text-sm ${!inquiry.is_read ? 'text-gold-primary' : 'text-white'}`}>{inquiry.name}</p>
                          <p className="text-xs text-white/40">{inquiry.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-white/70">
                        {inquiry.projects?.title || 'General Consultation'}
                      </td>
                      <td className="px-6 py-4 text-xs text-white/50">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] px-3 py-1 font-bold uppercase tracking-wider border ${
                          inquiry.is_read 
                            ? 'bg-dark-primary/60 border-dark-border/60 text-white/40' 
                            : 'bg-gold-primary/10 border-gold-primary/20 text-gold-primary'
                        }`}>
                          {inquiry.is_read ? 'Read Logged' : 'Pending Lead'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => toggleReadStatus(inquiry.id, inquiry.is_read)}
                            className={`p-2 border border-transparent rounded-lg transition-all duration-300 ${
                              inquiry.is_read 
                                ? 'text-white/40 hover:text-gold-primary hover:bg-white/5 hover:border-dark-border' 
                                : 'text-gold-primary bg-gold-primary/5 border-gold-primary/10 hover:bg-gold-primary/20'
                            }`}
                            title={inquiry.is_read ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            {inquiry.is_read ? <Eye size={15} /> : <CheckCircle size={15} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(inquiry.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-lg transition-all duration-300"
                            title="Delete Lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center text-white/30 uppercase tracking-widest text-xs font-light">
                      Lead queue is currently empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Elegant Slide-out Detailed Sidebar Panel */}
        <AnimatePresence>
          {selectedInquiry && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex justify-end bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedInquiry(null)}
            >
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="bg-dark-secondary border-l border-dark-border w-full max-w-xl h-full shadow-2xl flex flex-col text-offWhite"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Panel Header */}
                <div className="p-6 border-b border-dark-border/40 flex items-center justify-between bg-dark-primary/40 h-20">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-white">Lead Details Inquiry</h3>
                  <button 
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 hover:bg-white/5 rounded-full border border-dark-border/40 hover:border-gold-primary/20 transition-all text-white/50 hover:text-gold-primary"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto p-8 space-y-8">
                  {/* Avatar Profile */}
                  <div className="flex items-center gap-4 border-b border-dark-border/30 pb-6">
                    <div className="w-16 h-16 bg-gold-primary/10 border border-gold-primary/20 text-gold-primary rounded-xl flex items-center justify-center text-2xl font-display font-semibold">
                      {selectedInquiry.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold text-white tracking-wide">{selectedInquiry.name}</h4>
                      <p className="text-xs text-white/40 mt-1">Submitted: {new Date(selectedInquiry.created_at).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Specification Cards */}
                  <div className="grid grid-cols-1 gap-4 bg-dark-primary/40 border border-dark-border/60 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 border border-dark-border bg-dark-secondary rounded text-gold-primary/80">
                        <Mail size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">Email Address</p>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-sm font-semibold text-white hover:text-gold-primary transition-colors">{selectedInquiry.email || 'Not provided'}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="p-2 border border-dark-border bg-dark-secondary rounded text-gold-primary/80">
                        <Phone size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">Phone Number</p>
                        <a href={`tel:${selectedInquiry.phone}`} className="text-sm font-semibold text-white hover:text-gold-primary transition-colors">{selectedInquiry.phone}</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-2 border border-dark-border bg-dark-secondary rounded text-gold-primary/80">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">Interested Property</p>
                        <p className="text-sm font-semibold text-white">{selectedInquiry.projects?.title || 'General Consultation'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Message */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Customer Notes</h5>
                    <div className="bg-dark-primary/60 border border-dark-border/40 p-6 rounded text-white/80 text-sm leading-relaxed italic relative">
                      "{selectedInquiry.message}"
                    </div>
                  </div>

                </div>

                {/* Operations Bar */}
                <div className="p-6 border-t border-dark-border/40 flex items-center justify-between bg-dark-primary/40">
                  <button
                    onClick={() => toggleReadStatus(selectedInquiry.id, selectedInquiry.is_read)}
                    className={`flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md ${
                      selectedInquiry.is_read 
                        ? 'bg-dark-secondary hover:bg-white/5 border border-dark-border text-white/60' 
                        : 'bg-gold-primary hover:bg-gold-light text-dark-primary shadow-gold-primary/5'
                    }`}
                  >
                    {selectedInquiry.is_read ? <Eye size={16} /> : <CheckCircle size={16} />}
                    {selectedInquiry.is_read ? 'Mark as Unread' : 'Mark as Processed'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  >
                    <Trash2 size={16} />
                    Delete Lead
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
