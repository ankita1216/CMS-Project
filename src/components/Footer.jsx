import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Facebook, Instagram, Youtube, MapPin } from 'lucide-react'
import { DUMMY_SETTINGS } from '../data/dummyData'

const Footer = () => {
  return (
    <footer className="bg-dark-primary pt-32 pb-12 overflow-hidden border-t border-dark-border">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Section: CTA & Big Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Ready to find your <br/><span className="text-gold-primary italic font-light">dream property?</span>
            </h2>
            <Link to="/contact" className="inline-flex items-center gap-4 text-gold-primary uppercase tracking-[0.2em] font-bold text-sm group pb-2 border-b border-gold-primary/30 hover:border-gold-primary transition-colors">
              Schedule a Private Viewing <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
          
          <div className="flex flex-col items-start lg:items-end">
            <span className="text-5xl md:text-7xl font-display font-bold text-white tracking-widest">AURUM</span>
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-gold-primary uppercase mt-2">Estates</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-dark-border mb-20" />

        {/* Middle Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Contact Details */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-12">
            <div>
              <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-6 font-bold">Contact Us</p>
              <div className="space-y-4">
                <a href={`mailto:${DUMMY_SETTINGS.contact_email}`} className="block text-2xl md:text-3xl font-display text-white hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_email}</a>
                <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="block text-xl md:text-2xl font-display text-white/70 hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_phone}</a>
              </div>
            </div>
            
            <div>
              <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-6 font-bold">Location</p>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs flex items-start gap-3">
                <MapPin size={16} className="text-gold-primary mt-1 shrink-0" />
                {DUMMY_SETTINGS.contact_address}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-7">
            <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-8 font-bold">Navigation</p>
            <ul className="space-y-5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'About Us', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-gold-primary group-hover:w-4 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div className="lg:col-span-2">
            <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-8 font-bold">Portfolio</p>
            <ul className="space-y-5">
              {['Residential', 'Commercial', 'Luxury Villas', 'Plotted Land'].map((item) => (
                <li key={item}>
                  <Link to={`/projects?category=${item}`} className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-gold-primary group-hover:w-4 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full space-y-12">
            <div>
              <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-8 font-bold">Follow Us</p>
              <div className="flex flex-col gap-5">
                <a href={DUMMY_SETTINGS.facebook_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-gold-primary transition-colors text-sm group">
                  <Facebook size={18} className="group-hover:scale-110 transition-transform" /> Facebook
                </a>
                <a href={DUMMY_SETTINGS.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-gold-primary transition-colors text-sm group">
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" /> Instagram
                </a>
                <a href={DUMMY_SETTINGS.youtube_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-gold-primary transition-colors text-sm group">
                  <Youtube size={18} className="group-hover:scale-110 transition-transform" /> YouTube
                </a>
              </div>
            </div>
            
            <div>
               <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-6 font-bold">Legal</p>
               <Link to="/privacy" className="text-white/40 hover:text-white text-xs transition-colors block">Privacy Policy</Link>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[10px] uppercase tracking-widest text-center md:text-left">
            {DUMMY_SETTINGS.footer_text}
          </p>
          <p className="text-white/30 text-[10px] uppercase tracking-widest text-center md:text-right">
            RERA Registered | Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
