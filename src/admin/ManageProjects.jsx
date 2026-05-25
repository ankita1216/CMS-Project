import React, { useState, useEffect } from 'react';
import { 
  fetchProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  uploadImages 
} from '../lib/api';
import AdminLayout from './AdminLayout';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  X, 
  Loader2,
  AlertCircle,
  MapPin,
  Tag,
  Building,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Form State containing standard & "etc" detailed properties
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'ongoing',
    price: '',
    category: '',
    is_featured: false,
    images: [],
    city: '',
    short_description: '',
    rera_number: '',
    highlights: '', // handled as comma-separated string in form
    amenities: '', // handled as comma-separated string in form
    price_min: '',
    price_max: '',
    area_min: '',
    area_max: ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const { urls } = await uploadImages(files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
    } catch (err) {
      setError('Failed to upload images. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(url => url !== urlToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare fully structured payload with calculated/parsed values
    const payload = {
      ...formData,
      highlights: formData.highlights ? formData.highlights.split(',').map(s => s.trim()).filter(Boolean) : [],
      amenities: formData.amenities ? formData.amenities.split(',').map(s => s.trim()).filter(Boolean) : [],
      price_min: formData.price_min ? parseFloat(formData.price_min) : null,
      price_max: formData.price_max ? parseFloat(formData.price_max) : null,
      area_min: formData.area_min ? parseInt(formData.area_min) : null,
      area_max: formData.area_max ? parseInt(formData.area_max) : null,
      price_label: formData.price,
      area_label: formData.area_min && formData.area_max ? `${formData.area_min} - ${formData.area_max} Sq.Ft.` : 'Spacious Layouts',
      thumbnail: formData.images?.[0] || 'https://picsum.photos/id/122/800/600'
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }

      setIsModalOpen(false);
      setEditingProject(null);
      resetForm();
      loadProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || '',
      location: project.location || '',
      status: project.status || 'ongoing',
      price: project.price || '',
      category: project.category || '',
      is_featured: project.is_featured || false,
      images: project.images || [],
      city: project.city || '',
      short_description: project.short_description || '',
      rera_number: project.rera_number || '',
      highlights: project.highlights ? project.highlights.join(', ') : '',
      amenities: project.amenities ? project.amenities.join(', ') : '',
      price_min: project.price_min || '',
      price_max: project.price_max || '',
      area_min: project.area_min || '',
      area_max: project.area_max || ''
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      status: 'ongoing',
      price: '',
      category: '',
      is_featured: false,
      images: [],
      city: '',
      short_description: '',
      rera_number: '',
      highlights: '',
      amenities: '',
      price_min: '',
      price_max: '',
      area_min: '',
      area_max: ''
    });
  };

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border/40 pb-6">
          <div className="relative flex-grow max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-gold-primary transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search portfolio listings..."
              className="w-full pl-10 pr-4 py-3 bg-dark-primary border border-dark-border/60 hover:border-dark-border text-white text-xs uppercase tracking-wider focus:border-gold-primary outline-none transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => { resetForm(); setEditingProject(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-gold-primary hover:bg-gold-light text-dark-primary px-6 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-primary/5 active:scale-95 self-end md:self-auto"
          >
            <Plus size={16} /> Add Listing
          </button>
        </div>

        {/* Listings Display Grid/List */}
        <div className="bg-dark-secondary rounded-xl border border-dark-border/60 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-primary/60 border-b border-dark-border/40">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Residence Profile</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Address</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Status Badge</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">Starting Price</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/30">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-white/40">
                      <Loader2 className="animate-spin mx-auto mb-3 text-gold-primary" size={28} />
                      <span className="text-xs uppercase tracking-widest">Accessing Portfolio...</span>
                    </td>
                  </tr>
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-dark-primary/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded border border-dark-border flex-shrink-0 overflow-hidden bg-dark-primary">
                            {project.images?.[0] ? (
                              <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-full h-full p-4 text-white/20" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-white tracking-wide text-sm">{project.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {project.is_featured && (
                                <span className="text-[8px] bg-gold-primary/10 border border-gold-primary/20 text-gold-primary px-1.5 py-0.5 font-bold uppercase tracking-wider">Featured</span>
                              )}
                              <span className="text-[9px] text-white/40 uppercase tracking-wider">{project.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-white/70">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-gold-primary/60" />
                          {project.location}{project.city ? `, ${project.city}` : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] px-3 py-1 font-bold uppercase tracking-wider border ${
                          project.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          project.status === 'ongoing' ? 'bg-gold-primary/10 border-gold-primary/20 text-gold-primary' :
                          'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-white tracking-wide">{project.price}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => openEditModal(project)}
                            className="p-2 text-white/40 hover:text-gold-primary hover:bg-white/5 border border-transparent hover:border-dark-border rounded-lg transition-all duration-300"
                            title="Edit project"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-lg transition-all duration-300"
                            title="Delete project"
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
                      No listings found inside catalog
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breathtaking Luxury Glass Modal Form */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-dark-secondary border border-dark-border w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col rounded-xl text-offWhite"
              >
                
                {/* Modal Title */}
                <div className="p-6 border-b border-dark-border/40 flex items-center justify-between bg-dark-primary/40">
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Building size={18} className="text-gold-primary animate-pulse" />
                    {editingProject ? 'Modify Listing Specifications' : 'Draft New Portfolio Listing'}
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full border border-dark-border/40 hover:border-gold-primary/20 transition-all text-white/50 hover:text-gold-primary"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 space-y-8">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded flex items-center gap-3 text-xs uppercase tracking-wider font-semibold">
                      <AlertCircle size={16} /> {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Column 1: Info */}
                    <div className="space-y-5">
                      <h4 className="text-[10px] font-bold text-gold-primary uppercase tracking-[0.2em]">General Specifications</h4>
                      
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-widest text-white/40">Project Title *</label>
                        <input
                          type="text"
                          name="title"
                          required
                          className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                          placeholder="e.g. Aurum Sky Villas"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Address Location *</label>
                          <input
                            type="text"
                            name="location"
                            required
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            placeholder="e.g. Worli Sea Face"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">City Profile *</label>
                          <input
                            type="text"
                            name="city"
                            required
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            placeholder="e.g. Mumbai"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1 col-span-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Build Status</label>
                          <select
                            name="status"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.status}
                            onChange={handleInputChange}
                          >
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="upcoming">Upcoming</option>
                          </select>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Price Label (Starting From)</label>
                          <input
                            type="text"
                            name="price"
                            required
                            placeholder="e.g. 12.5 Cr - 25 Cr"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.price}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Listing Category</label>
                          <input
                            type="text"
                            name="category"
                            placeholder="e.g. Luxury Villas"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.category}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">RERA Registration ID</label>
                          <input
                            type="text"
                            name="rera_number"
                            placeholder="e.g. P51900012345"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.rera_number}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 py-3 border border-dark-border/30 bg-dark-primary/30 px-4">
                        <input
                          type="checkbox"
                          id="is_featured"
                          name="is_featured"
                          className="w-4 h-4 rounded border-dark-border bg-dark-primary text-gold-primary focus:ring-0 focus:ring-offset-0"
                          checked={formData.is_featured}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="is_featured" className="text-[10px] font-bold uppercase tracking-widest text-white/60">Highlight on Homepage</label>
                      </div>
                    </div>

                    {/* Column 2: Dimensions, Highlights & Media */}
                    <div className="space-y-5">
                      <h4 className="text-[10px] font-bold text-gold-primary uppercase tracking-[0.2em]">Dimensions, Features & Media</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Min Price (in Cr)</label>
                          <input
                            type="number"
                            step="0.01"
                            name="price_min"
                            placeholder="e.g. 12.5"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.price_min}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Max Price (in Cr)</label>
                          <input
                            type="number"
                            step="0.01"
                            name="price_max"
                            placeholder="e.g. 25.0"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.price_max}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Min Size (Sq.Ft)</label>
                          <input
                            type="number"
                            name="area_min"
                            placeholder="e.g. 4500"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.area_min}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Max Size (Sq.Ft)</label>
                          <input
                            type="number"
                            name="area_max"
                            placeholder="e.g. 8200"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.area_max}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-widest text-white/40">Short Ticker Description</label>
                        <input
                          type="text"
                          name="short_description"
                          placeholder="e.g. Architectural marvel rising above Worli coastline"
                          className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                          value={formData.short_description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Highlights (comma separated)</label>
                          <input
                            type="text"
                            name="highlights"
                            placeholder="Sea View, Smart Automation, Private Lift"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.highlights}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase tracking-widest text-white/40">Amenities (comma separated)</label>
                          <input
                            type="text"
                            name="amenities"
                            placeholder="Pool, Gym, Clubhouse, Security"
                            className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-sm text-white focus:border-gold-primary outline-none transition-colors"
                            value={formData.amenities}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-widest text-white/40">Full Description</label>
                        <textarea
                          name="description"
                          rows="3"
                          className="w-full bg-dark-primary border border-dark-border/60 px-4 py-3 text-xs text-white focus:border-gold-primary outline-none resize-none"
                          placeholder="Elaborate on the architectural grandeur and layout options..."
                          value={formData.description}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-[9px] uppercase tracking-widest text-white/40">Upload Media Gallery</label>
                        <div className="grid grid-cols-4 gap-3">
                          {formData.images.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded overflow-hidden group border border-dark-border bg-dark-primary">
                              <img src={url} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(url)}
                                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                          
                          <label className="aspect-square rounded border border-dashed border-dark-border/80 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-gold-primary hover:bg-gold-primary/5 transition-all text-white/40 hover:text-gold-primary">
                            {uploading ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <>
                                <Plus size={16} />
                                <span className="text-[8px] font-bold uppercase tracking-widest">Media</span>
                              </>
                            )}
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-dark-border/40 flex justify-end gap-4 bg-dark-primary/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 text-xs uppercase tracking-widest text-white/60 hover:text-white border border-dark-border hover:border-white/10 transition-all font-semibold"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploading}
                      className="flex items-center gap-2 bg-gold-primary hover:bg-gold-light text-dark-primary px-8 py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-primary/5 disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : (editingProject ? 'Save Specifications' : 'Publish Listing')}
                    </button>
                  </div>
                </form>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
