import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { DUMMY_SETTINGS } from '../data/dummyData'

const BrandIcon = ({ label, size = 20 }) => (
  <span
    className="inline-flex items-center justify-center rounded-full border border-current text-[10px] font-bold uppercase"
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    {label}
  </span>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <BrandIcon label="ig" size={20} />, href: DUMMY_SETTINGS.instagram_url, label: 'Instagram' },
    { icon: <BrandIcon label="f" size={20} />, href: DUMMY_SETTINGS.facebook_url, label: 'Facebook' },
    { icon: <BrandIcon label="yt" size={20} />, href: DUMMY_SETTINGS.youtube_url, label: 'YouTube' },
    { icon: <BrandIcon label="in" size={20} />, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-[#050505] border-t border-gold-primary/10 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Column 1: Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-display font-bold text-white group-hover:text-gold-primary transition-colors">AURUM</span>
              <span className="text-xs tracking-[0.4em] text-gold-primary block mt-1">ESTATES</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs italic font-display">
              "Where Legacy Meets Living"
            </p>
            <p className="text-muted/60 text-xs leading-relaxed max-w-xs">
              Crafting architectural masterpieces that define the skyline of India's most coveted addresses since 2006.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -5, color: '#C9A84C', scale: 1.2 }}
                  className="text-white/30 transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-8">
            <h4 className="overline-text">NAVIGATION</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Projects', path: '/projects' },
                { name: 'About Us', path: '/about' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Contact', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-muted hover:text-gold-primary text-sm transition-all flex items-center gap-0 hover:gap-3 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="space-y-8">
            <h4 className="overline-text">EXPLORE</h4>
            <ul className="space-y-4">
              {['Residential', 'Commercial', 'Luxury Villas', 'Plotted Land', 'Upcoming Projects'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/projects?category=${item}`} 
                    className="text-muted hover:text-gold-primary text-sm transition-all flex items-center gap-0 hover:gap-3 group"
                  >
                    <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-8">
            <h4 className="overline-text">CONTACT</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-muted text-sm leading-relaxed">
                <MapPin size={18} className="text-gold-primary shrink-0" />
                <span>{DUMMY_SETTINGS.contact_address}</span>
              </li>
              <li className="flex items-center gap-4 text-muted text-sm">
                <Phone size={18} className="text-gold-primary shrink-0" />
                <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_phone}</a>
              </li>
              <li className="flex items-center gap-4 text-muted text-sm">
                <Mail size={18} className="text-gold-primary shrink-0" />
                <a href={`mailto:${DUMMY_SETTINGS.contact_email}`} className="hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_email}</a>
              </li>
              <li className="pt-4">
                <a 
                  href={`https://wa.me/${DUMMY_SETTINGS.whatsapp_number}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 px-6 py-3 rounded-full hover:bg-emerald-600 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase font-bold"
                >
                  Chat on WhatsApp <ArrowRight size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-dark-border flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-muted/40 text-[10px] uppercase tracking-[0.2em] text-center lg:text-left">
            {DUMMY_SETTINGS.footer_text}
          </p>
          <p className="text-muted/40 text-[10px] uppercase tracking-[0.2em]">
            RERA Registered | All projects are RERA approved
          </p>
          <div className="flex gap-4">
             <span className="text-muted/40 text-[10px] uppercase tracking-[0.2em]">Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
