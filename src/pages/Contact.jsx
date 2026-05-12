import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import SectionHeader from '../components/SectionHeader'
import { MapPin, Phone, Mail, MessageSquare, Check, AlertCircle, Loader2 } from 'lucide-react'
import { DUMMY_SETTINGS } from '../data/dummyData'
import { supabase } from '../lib/supabaseClient'

const BrandIcon = ({ label, size = 24 }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border border-current text-[10px] font-bold uppercase"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    {label}
  </span>
)

const Contact = () => {
  const [formStep, setFormStep] = useState('idle') // idle, submitting, success, error
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_id: '',
    message: '',
    source: 'Google Search'
  })
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from('projects').select('id, title')
      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStep('submitting')
    setErrorMessage('')

    try {
      // 1. Save to Supabase Inquiries table
      const { error: sbError } = await supabase.from('inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_id: formData.project_id || null,
          message: formData.message,
        }
      ])

      if (sbError) throw sbError

      // 2. Send to Pabbly Webhook (if URL is provided)
      const pabblyUrl = import.meta.env.VITE_PABBLY_WEBHOOK
      if (pabblyUrl) {
        await fetch(pabblyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            projectName: projects.find(p => p.id === parseInt(formData.project_id))?.title || 'General Inquiry',
            timestamp: new Date().toISOString()
          })
        }).catch(err => console.warn('Pabbly Webhook failed, but data saved to DB', err))
      }

      setFormStep('success')
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage('Failed to send message. Please try again or call us directly.')
      setFormStep('error')
    }
  }

  return (
    <div className="pt-20">
      <SEOHead title="Contact Us" description="Get in touch with Aurum Estates for your dream home." />

      {/* HERO */}
      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-8 text-center">
          <SectionHeader overline="LET'S CONNECT" heading="Start Your Journey" align="center" />
          <p className="text-muted max-w-xl mx-auto -mt-8">We're here to guide you through every step of your real estate journey. Reach out to our luxury consultants today.</p>
        </div>
      </section>

      <section className="py-32 container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* LEFT: INFO */}
          <div>
            <div className="mb-12">
              <span className="text-3xl font-display font-bold text-white">AURUM</span>
              <span className="text-xs tracking-[0.4em] text-gold-primary block mt-1">ESTATES</span>
              <p className="italic text-gold-primary/60 mt-4 font-display">"Where Legacy Meets Living"</p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">Corporate Office</h4>
                  <p className="text-white/80 leading-relaxed">{DUMMY_SETTINGS.contact_address}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">Call Us</h4>
                  <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="text-white/80 hover:text-gold-primary transition-colors block text-lg">{DUMMY_SETTINGS.contact_phone}</a>
                  <p className="text-xs text-muted mt-1">{DUMMY_SETTINGS.business_hours}</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">Email Inquiries</h4>
                  <a href={`mailto:${DUMMY_SETTINGS.contact_email}`} className="text-white/80 hover:text-gold-primary transition-colors block text-lg">{DUMMY_SETTINGS.contact_email}</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">WhatsApp Concierge</h4>
                  <a href={`https://wa.me/${DUMMY_SETTINGS.whatsapp_number}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-500 px-6 py-2 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all text-xs tracking-widest uppercase mt-2">
                    Chat with us
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-dark-border">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted mb-6">Follow Our Journey</h4>
              <div className="flex gap-6">
                {[
                  { icon: <BrandIcon label="ig" />, label: 'Instagram' },
                  { icon: <BrandIcon label="f" />, label: 'Facebook' },
                  { icon: <BrandIcon label="yt" />, label: 'YouTube' },
                ].map((social, i) => (
                  <motion.a 
                    key={i} 
                    href="#" 
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, color: '#C9A84C' }}
                    className="text-white/30 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-dark-card border border-dark-border p-12 relative overflow-hidden">
             {formStep === 'success' ? (
              <div className="text-center py-20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-gold-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check className="text-dark-primary" size={40} />
                </motion.div>
                <h3 className="text-3xl font-display font-bold mb-4">Message Sent</h3>
                <p className="text-muted leading-relaxed">Thank you for reaching out. A dedicated consultant from our corporate team will contact you within the next 2 business hours.</p>
                <button onClick={() => setFormStep('idle')} className="mt-10 text-gold-primary border-b border-gold-primary pb-1 text-xs tracking-widest uppercase">Send another message</button>
              </div>
             ) : (
              <>
                <h3 className="text-3xl font-display font-bold mb-8">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded p-4 flex items-center gap-3 text-red-400 text-sm">
                      <AlertCircle size={18} /> {errorMessage}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Full Name *</label>
                      <input 
                        required 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all" 
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Phone Number *</label>
                      <input 
                        required 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all" 
                        placeholder="+91 98765..." 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all" 
                        placeholder="email@address.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted">Interested Project</label>
                      <select 
                        name="project_id"
                        value={formData.project_id}
                        onChange={handleInputChange}
                        className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all text-white"
                      >
                        <option value="">Select a Project</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted">How did you hear about us?</label>
                    <select 
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all text-white"
                    >
                      <option>Google Search</option>
                      <option>Social Media</option>
                      <option>Friend / Referral</option>
                      <option>Hoarding</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted">Your Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4" 
                      className="w-full bg-dark-primary border border-dark-border px-4 py-3 text-sm focus:border-gold-primary outline-none transition-all resize-none text-white" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formStep === 'submitting'}
                    className="w-full premium-btn-filled py-4 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {formStep === 'submitting' ? (
                      <><Loader2 className="animate-spin" size={20} /> Sending...</>
                    ) : 'Send Message'}
                  </button>
                  <p className="text-[10px] text-center text-muted">We respond within 2 business hours</p>
                </form>
              </>
             )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[450px] w-full border-y border-dark-border">
         <iframe 
          src={DUMMY_SETTINGS.google_maps_embed} 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  )
}

export default Contact
