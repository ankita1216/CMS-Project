import React from 'react'
import { Phone, Mail, MessageCircle } from 'lucide-react'
import { DUMMY_SETTINGS } from '../../data/dummyData'

const ContactStrip = () => {
  return (
    <section className="bg-dark-secondary border-t border-dark-border py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="flex items-center justify-center gap-5 group py-4">
             <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500"><Phone size={20} /></div>
             <div><p className="text-[9px] uppercase tracking-widest text-muted mb-1">Call Us</p><p className="text-lg font-display text-white group-hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_phone}</p></div>
          </a>
          <div className="hidden md:block w-[1px] h-full bg-dark-border mx-auto" />
          <a href={`mailto:${DUMMY_SETTINGS.contact_email}`} className="flex items-center justify-center gap-5 group py-4">
             <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500"><Mail size={20} /></div>
             <div><p className="text-[9px] uppercase tracking-widest text-muted mb-1">Email Us</p><p className="text-lg font-display text-white group-hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_email}</p></div>
          </a>
          <div className="hidden md:block w-[1px] h-full bg-dark-border mx-auto" />
          <a href={`https://wa.me/${DUMMY_SETTINGS.whatsapp_number}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-5 group py-4">
             <div className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-dark-primary transition-all duration-500"><MessageCircle size={20} /></div>
             <div><p className="text-[9px] uppercase tracking-widest text-muted mb-1">WhatsApp</p><p className="text-lg font-display text-white group-hover:text-gold-primary transition-colors">Chat With Us</p></div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
