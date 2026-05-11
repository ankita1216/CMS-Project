import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { DUMMY_PROJECTS } from '../data/dummyData'
import SEOHead from '../components/SEOHead'
import { MapPin, Check, FileText, Play, Waves, Dumbbell, Car, ArrowUpDown, Shield, TreeDeciduous, Building, Star, Activity, Zap, Wifi, Trophy, X } from 'lucide-react'

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = DUMMY_PROJECTS.find(p => p.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [activePlan, setActivePlan] = useState(0)
  const [formStep, setFormStep] = useState('idle') // idle | submitting | success

  if (!project) return <div className="pt-40 text-center">Project not found</div>

  const amenityIcons = {
    "Pool": <Waves size={24} />,
    "Gym": <Dumbbell size={24} />,
    "Parking": <Car size={24} />,
    "Lift": <ArrowUpDown size={24} />,
    "Security": <Shield size={24} />,
    "Garden": <TreeDeciduous size={24} />,
    "Clubhouse": <Building size={24} />,
    "Playground": <Star size={24} />,
    "Jogging": <Activity size={24} />,
    "Power Backup": <Zap size={24} />,
    "WiFi": <Wifi size={24} />,
    "Tennis": <Trophy size={24} />
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault()
    setFormStep('submitting')
    // Simulate API call
    setTimeout(() => {
      console.log("Inquiry Submitted for:", project.title)
      setFormStep('success')
    }, 1500)
  }

  return (
    <div className="pt-20">
      <SEOHead title={project.title} description={project.short_description} image={project.thumbnail} />

      {/* SECTION 1: GALLERY */}
      <section className="relative h-[65vh] overflow-hidden bg-black">
        <AnimatePresence mode='wait'>
          <motion.img
            key={activeImage}
            src={project.images[activeImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute bottom-8 right-8 z-10 flex gap-4">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`w-16 h-10 border-2 transition-all ${activeImage === i ? 'border-gold-primary scale-110' : 'border-transparent opacity-50'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 bg-black/60 backdrop-blur-md px-4 py-2 text-xs tracking-widest text-white">
          {activeImage + 1} / {project.images.length}
        </div>
      </section>

      <div className="container mx-auto px-8 py-20 flex flex-col lg:flex-row gap-16">
        {/* LEFT COLUMN */}
        <div className="lg:w-2/3">
          <nav className="text-[10px] tracking-[0.3em] uppercase text-gold-primary mb-6">
            <Link to="/">Home</Link> → <Link to="/projects">Projects</Link> → {project.title}
          </nav>
          
          <div className="flex gap-4 mb-6">
            <span className="px-3 py-1 bg-gold-primary/10 text-gold-primary text-[10px] uppercase font-bold tracking-widest">{project.status}</span>
            <span className="px-3 py-1 bg-white/5 text-white/60 text-[10px] uppercase font-bold tracking-widest">{project.category}</span>
          </div>

          <h1 className="text-5xl font-display font-bold mb-6">{project.title}</h1>
          <div className="flex items-center gap-2 text-muted mb-8">
            <MapPin size={18} className="text-gold-primary" />
            <span>{project.location}, {project.city}</span>
          </div>

          <p className="text-xl text-white/80 leading-relaxed mb-12">{project.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-10 bg-dark-secondary border border-dark-border mb-16">
            {[
              { label: 'Starting Price', value: `₹ ${project.price_label}` },
              { label: 'Area Range', value: project.area_label },
              { label: 'Possession', value: 'Dec 2026' },
              { label: 'Status', value: project.status },
              { label: 'RERA ID', value: project.rera_number },
              { label: 'Land Area', value: '4.5 Acres' }
            ].map((spec, i) => (
              <div key={i}>
                <p className="text-[10px] text-muted uppercase tracking-widest mb-1">{spec.label}</p>
                <p className={`font-semibold ${spec.label === 'Starting Price' ? 'text-gold-primary text-lg' : 'text-offWhite'}`}>{spec.value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-display font-bold mb-8">Project Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-primary/20 flex items-center justify-center">
                  <Check size={12} className="text-gold-primary" />
                </div>
                <span className="text-white/70">{h}</span>
              </div>
            ))}
          </div>

          {/* AMENITIES */}
          <h3 className="text-2xl font-display font-bold mb-8">World-Class Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-20">
            {project.amenities.map((a, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-default">
                <motion.div 
                  whileHover={{ scale: 1.1, color: '#C9A84C' }}
                  className="w-16 h-16 rounded-full border border-dark-border flex items-center justify-center text-white/40 transition-colors mb-3"
                >
                  {amenityIcons[a] || <Star size={24} />}
                </motion.div>
                <p className="text-[10px] uppercase tracking-widest text-muted group-hover:text-gold-primary transition-colors">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY FORM */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 bg-dark-card border border-dark-border p-10">
            {formStep === 'success' ? (
              <div className="text-center py-10">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-16 h-16 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="text-dark-primary" size={32} />
                </motion.div>
                <h3 className="text-2xl font-display font-bold mb-2 text-offWhite">Thank You!</h3>
                <p className="text-muted text-sm leading-relaxed">Our luxury consultant will call you within the next 2 hours for exclusive details.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-bold mb-2">Get Exclusive Details</h3>
                <p className="text-muted text-xs uppercase tracking-widest mb-8">Personalized Virtual Tour Available</p>
                
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted">Full Name *</label>
                    <input required type="text" className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted">Phone Number *</label>
                    <div className="flex">
                      <span className="bg-dark-primary border border-dark-border border-r-0 px-3 flex items-center text-sm text-muted">+91</span>
                      <input required type="tel" className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-colors" placeholder="9876543210" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted">Email Address</label>
                    <input type="email" className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-muted">Your Budget</label>
                    <select className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-colors text-muted">
                      <option>Select Budget Range</option>
                      <option>&lt; 1 Cr</option>
                      <option>1 Cr - 3 Cr</option>
                      <option>3 Cr - 5 Cr</option>
                      <option>5 Cr +</option>
                    </select>
                  </div>
                  <button 
                    disabled={formStep === 'submitting'}
                    className="w-full premium-btn-filled mt-4"
                  >
                    {formStep === 'submitting' ? 'Processing...' : 'Request Callback'}
                  </button>
                  <p className="text-[10px] text-center text-muted italic">🔒 Your information is 100% secure with us</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
