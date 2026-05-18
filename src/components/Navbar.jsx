import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ChevronDown, Facebook, Instagram, Youtube } from 'lucide-react'
import { DUMMY_SETTINGS } from '../data/dummyData'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const leftNavLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Projects', 
      path: '/projects',
      hasMegaMenu: true,
      megaMenu: {
        categories: ['Residential', 'Commercial', 'Luxury Villas', 'Plotted Land'],
        cities: ['Indore', 'Kolkata', 'Bhopal']
      }
    },
  ]

  const rightNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Top Bar for Socials & Contact - Only visible when not scrolled or explicitly on top */}
      <AnimatePresence>
        {!isScrolled && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="hidden md:flex justify-between items-center py-2 px-8 bg-dark-primary/90 border-b border-white/5 absolute top-0 w-full z-50 text-[10px] tracking-widest text-white/50 uppercase"
          >
            <div className="flex gap-6">
              <span className="flex items-center gap-2 hover:text-gold-primary transition-colors cursor-pointer"><Facebook size={12} /> Facebook</span>
              <span className="flex items-center gap-2 hover:text-gold-primary transition-colors cursor-pointer"><Instagram size={12} /> Instagram</span>
              <span className="flex items-center gap-2 hover:text-gold-primary transition-colors cursor-pointer"><Youtube size={12} /> YouTube</span>
            </div>
            <div className="flex gap-6">
              <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_phone}</a>
              <a href={`mailto:${DUMMY_SETTINGS.contact_email}`} className="hover:text-gold-primary transition-colors">{DUMMY_SETTINGS.contact_email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${
          isScrolled ? 'top-0 glass-nav py-4' : 'top-0 md:top-8 bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 grid grid-cols-3 items-center">
          
          {/* Left Nav */}
          <div className="hidden md:flex items-center gap-8 justify-start">
            {leftNavLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group py-2"
                onMouseEnter={() => link.hasMegaMenu && setActiveDropdown('projects')}
                onMouseLeave={() => link.hasMegaMenu && setActiveDropdown(null)}
              >
                <Link to={link.path} className="flex items-center gap-1">
                  <span className={`text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                    location.pathname === link.path ? 'text-gold-primary' : 'text-white/70 group-hover:text-white'
                  }`}>
                    {link.name}
                  </span>
                  {link.hasMegaMenu && <ChevronDown size={14} className="text-white/50 group-hover:text-white transition-colors" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.hasMegaMenu && (
                  <AnimatePresence>
                    {activeDropdown === 'projects' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 mt-4 w-[600px] bg-dark-card border border-dark-border shadow-2xl p-8 flex gap-12"
                      >
                        <div className="flex-1 space-y-6">
                          <h4 className="text-gold-primary text-[10px] uppercase tracking-[0.3em] font-bold">By Category</h4>
                          <ul className="space-y-4">
                            {link.megaMenu.categories.map(cat => (
                              <li key={cat}>
                                <Link to={`/projects?category=${cat}`} className="text-white/70 hover:text-white text-sm transition-colors flex items-center justify-between group/item">
                                  {cat} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-gold-primary" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-[1px] bg-white/5" />
                        <div className="flex-1 space-y-6">
                          <h4 className="text-gold-primary text-[10px] uppercase tracking-[0.3em] font-bold">By City</h4>
                          <ul className="space-y-4">
                            {link.megaMenu.cities.map(city => (
                              <li key={city}>
                                <Link to={`/projects?city=${city}`} className="text-white/70 hover:text-white text-sm transition-colors flex items-center justify-between group/item">
                                  {city} <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-gold-primary" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-[1px] bg-white/5" />
                        <div className="flex-1 flex flex-col justify-end">
                           <div className="bg-white/5 p-6 border border-white/5">
                             <p className="text-xs text-white/50 mb-4">Looking for something specific?</p>
                             <Link to="/contact" className="text-gold-primary text-sm uppercase tracking-widest font-bold flex items-center gap-2 group/cta">
                               Get in Touch <ChevronRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                             </Link>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex justify-start md:justify-center">
            <Link to="/" className="group flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-display font-bold tracking-widest text-white group-hover:text-gold-primary transition-colors">
                AURUM
              </span>
              <span className="text-[8px] md:text-[10px] tracking-[0.4em] text-gold-primary uppercase">Estates</span>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center gap-8 justify-end">
            {rightNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative group py-2"
              >
                <span className={`text-xs uppercase tracking-widest transition-colors duration-300 font-medium ${
                  location.pathname === link.path ? 'text-gold-primary' : 'text-white/70 group-hover:text-white'
                }`}>
                  {link.name}
                </span>
              </Link>
            ))}
            <Link to="/contact" className="premium-btn-outline py-2 px-6 text-xs tracking-widest uppercase">
              Enquire
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden justify-end">
            <button 
              className="text-white hover:text-gold-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-dark-primary flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-dark-border">
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-white">AURUM</span>
                <span className="text-[9px] tracking-[0.3em] text-gold-primary uppercase">Estates</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-gold-primary transition-colors">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-10 px-8 flex flex-col gap-6">
              {[...leftNavLinks, ...rightNavLinks].map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-dark-border pb-6"
                >
                  <Link
                    to={link.path}
                    onClick={() => !link.hasMegaMenu && setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-3xl font-display text-white group-hover:text-gold-primary transition-colors">
                      {link.name}
                    </span>
                    {!link.hasMegaMenu && <ChevronRight className="text-gold-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />}
                  </Link>
                  
                  {/* Mobile Mega Menu items (accordion style) */}
                  {link.hasMegaMenu && (
                    <div className="mt-6 pl-4 space-y-6 border-l border-gold-primary/30">
                      <div>
                        <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-4">Categories</p>
                        <div className="flex flex-col gap-3">
                          {link.megaMenu.categories.map(cat => (
                            <Link key={cat} to={`/projects?category=${cat}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 text-lg">
                              {cat}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gold-primary text-[10px] uppercase tracking-widest mb-4">Cities</p>
                        <div className="flex flex-col gap-3">
                          {link.megaMenu.cities.map(city => (
                            <Link key={city} to={`/projects?city=${city}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 text-lg">
                              {city}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {/* Mobile Socials */}
              <div className="flex gap-6 mt-6">
                 <Facebook size={24} className="text-white/50 hover:text-gold-primary transition-colors" />
                 <Instagram size={24} className="text-white/50 hover:text-gold-primary transition-colors" />
                 <Youtube size={24} className="text-white/50 hover:text-gold-primary transition-colors" />
              </div>
            </div>
            
            <div className="p-8 border-t border-dark-border bg-dark-secondary">
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="premium-btn-filled w-full text-center py-4"
              >
                Schedule Site Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
