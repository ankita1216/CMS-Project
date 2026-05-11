import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ArrowRight, ShieldCheck, Clock, Gem, HeadphonesIcon, ChevronLeft, ChevronRight, Phone, Mail, MessageCircle, Star, Quote, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { DUMMY_PROJECTS, DUMMY_SETTINGS, DUMMY_TESTIMONIALS, DUMMY_TEAM, DUMMY_AWARDS } from '../data/dummyData'
import { useCountUp } from '../hooks/useCountUp'

// --- Sub-Components ---

const StatItem = ({ label, value }) => {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="text-center group">
      <div className="h-[1px] w-10 bg-gold-primary mx-auto mb-6 opacity-40 group-hover:w-20 transition-all duration-500" />
      <h3 className="text-5xl md:text-7xl font-display text-gold-primary mb-2">{count}+</h3>
      <p className="text-muted text-xs uppercase tracking-[0.3em] font-medium">{label}</p>
    </div>
  )
}

const CategoryTile = ({ category, image, count, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="relative aspect-square overflow-hidden group cursor-pointer border border-transparent hover:border-gold-primary transition-all duration-700"
  >
    <img src={image} alt={category} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end p-8">
      <p className="text-gold-primary text-[10px] tracking-[0.3em] uppercase mb-2">{count} Projects</p>
      <h4 className="text-2xl font-display text-white group-hover:text-gold-primary transition-colors flex items-center justify-between">
        {category} <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
      </h4>
    </div>
  </motion.div>
)

const Home = () => {
  const [activePlan, setActivePlan] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const floorPlans = [
    { name: '2BHK Signature', carpet: '1,240 Sq.Ft', built: '1,450 Sq.Ft', image: 'https://picsum.photos/id/10/800/800', features: ['2 Master Bedrooms', 'Large Balcony', 'Open Kitchen', 'Utility Area'] },
    { name: '3BHK Grande', carpet: '1,850 Sq.Ft', built: '2,100 Sq.Ft', image: 'https://picsum.photos/id/20/800/800', features: ['3 Bedrooms', 'Worker Room', 'L-Shaped Living', 'Private Foyer'] },
    { name: '4BHK Majestic', carpet: '2,600 Sq.Ft', built: '3,200 Sq.Ft', image: 'https://picsum.photos/id/30/800/800', features: ['4 Bedrooms', 'Study Room', 'Walk-in Closets', '3 Balconies'] }
  ]

  const categories = [
    { name: 'Residential', image: 'https://picsum.photos/id/122/600/600', count: 18 },
    { name: 'Commercial', image: 'https://picsum.photos/id/123/600/600', count: 12 },
    { name: 'Luxury Villas', image: 'https://picsum.photos/id/124/600/600', count: 9 },
    { name: 'Plotted Land', image: 'https://picsum.photos/id/125/600/600', count: 8 }
  ]

  return (
    <div className="bg-dark-primary overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO BANNER */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-dark-primary z-10" />
          <div className="w-full h-full animate-kenburns">
            <img src="https://picsum.photos/id/122/1920/1080" alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <h1 className="text-[25vw] font-display font-bold leading-none">AURUM</h1>
        </div>

        <div className="relative z-20 container mx-auto px-8 text-center flex flex-col items-center">
          <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2 }} className="h-[1px] bg-gold-primary mb-8" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="overline-text mb-8">
            EST. 2006 · LUXURY REAL ESTATE
          </motion.p>
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-10 max-w-5xl leading-[1.1]">
            {"Crafting Homes That Define Generations".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.3em] text-white"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 1.8 }} className="text-white/60 text-lg md:text-xl font-light mb-14 max-w-2xl leading-relaxed">
            {DUMMY_SETTINGS.hero_subheadline}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.2 }} className="flex flex-col sm:flex-row gap-8">
            <Link to="/projects" className="premium-btn-filled flex items-center gap-4 group">
              Explore Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => setIsVideoModalOpen(true)} className="premium-btn-outline flex items-center gap-4 group">
              <div className="w-6 h-6 rounded-full border border-gold-primary flex items-center justify-center group-hover:bg-gold-primary transition-all">
                <Play size={10} className="group-hover:text-dark-primary ml-0.5" />
              </div>
              Watch Our Story
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.4em] text-white/40 uppercase rotate-180 [writing-mode:vertical-lr]">SCROLL</span>
          <motion.div animate={{ height: [0, 40, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-[1px] bg-gold-primary" />
        </div>
      </section>

      {/* 2. GOLD MARQUEE TICKER */}
      <div className="bg-gold-primary py-3.5 overflow-hidden whitespace-nowrap relative z-30">
        <div className="inline-block animate-marquee">
          {[1,2,3,4].map(i => (
            <span key={i} className="text-dark-primary text-[11px] font-bold tracking-[0.25em] uppercase mx-16">
              LUXURY LIVING · RERA APPROVED · ON-TIME DELIVERY · PREMIUM QUALITY · TRUSTED SINCE 2006 · 47 PROJECTS DELIVERED · ◆
            </span>
          ))}
        </div>
      </div>

      {/* 3. ABOUT INTRO SPLIT SCREEN */}
      <section className="py-40 container mx-auto px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <motion.div initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="aspect-[3/4] overflow-hidden">
              <img src="https://picsum.photos/id/123/800/1000" alt="About" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
            <motion.div initial={{ x: 20, y: 20 }} whileInView={{ x: 0, y: 0 }} transition={{ duration: 1 }} className="absolute -top-6 -left-6 w-full h-full border border-gold-primary/20 -z-10" />
            <div className="absolute bottom-12 right-12 bg-dark-card p-8 border border-dark-border shadow-2xl">
              <p className="text-gold-primary text-4xl font-display font-bold mb-1">18 Years</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/50">of architectural legacy</p>
            </div>
          </div>
          
          <div className="relative">
            <SectionHeader number="01" overline="OUR STORY" heading="Built on Trust, Delivered with Pride" 
              subtext="For nearly two decades, Aurum Estates has been crafting more than just buildings; we build landmarks. Our philosophy is rooted in architectural brilliance and uncompromising quality. Every home we build is a masterpiece of design and engineering."
            />
            <div className="grid grid-cols-3 gap-12 mt-16 pt-16 border-t border-dark-border">
              <div><p className="text-gold-primary text-4xl font-display mb-2">47+</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Projects</p></div>
              <div><p className="text-gold-primary text-4xl font-display mb-2">3.2k+</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Families</p></div>
              <div><p className="text-gold-primary text-4xl font-display mb-2">8</p><p className="text-[10px] text-muted uppercase tracking-[0.2em]">Cities</p></div>
            </div>
            <Link to="/about" className="mt-16 text-gold-primary flex items-center gap-4 group text-xs tracking-[0.3em] uppercase font-bold">
              Discover Our Journey <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER BAR */}
      <section className="bg-dark-secondary py-24 border-y border-dark-border">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
            <StatItem label="Projects Delivered" value={47} />
            <StatItem label="Happy Families" value={3200} />
            <StatItem label="Cities Present" value={8} />
            <StatItem label="Years of Trust" value={18} />
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS (Asymmetric Grid) */}
      <section className="py-40 bg-dark-primary">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <SectionHeader number="02" overline="SIGNATURE PROJECTS" heading="Our Finest Developments" />
            <Link to="/projects" className="text-gold-primary flex items-center gap-4 group text-xs tracking-[0.3em] uppercase font-bold mb-6">
              View All Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {DUMMY_PROJECTS.slice(0, 5).map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`${i === 0 ? 'md:col-span-8 h-[600px]' : i === 1 ? 'md:col-span-4 h-[600px]' : 'md:col-span-4 h-[450px]'} relative group overflow-hidden cursor-pointer`}
              >
                <Link to={`/projects/${project.slug}`}>
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-8 left-8">
                    <span className={`px-5 py-1.5 text-[9px] uppercase tracking-[0.2em] font-bold ${
                      project.status === 'ongoing' ? 'bg-gold-primary text-dark-primary' : 
                      project.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10">
                    <p className="text-gold-primary text-[10px] tracking-[0.4em] uppercase mb-3">{project.category}</p>
                    <h3 className={`${i === 0 ? 'text-4xl' : 'text-2xl'} font-display font-bold text-white mb-4 transition-colors group-hover:text-gold-primary`}>{project.title}</h3>
                    <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-700">
                      <p className="text-white/60 text-sm tracking-wide">{project.location}</p>
                      <p className="text-gold-primary font-bold text-lg">₹ {project.price_label}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROPERTY CATEGORIES */}
      <section className="py-40 bg-dark-secondary">
        <div className="container mx-auto px-8 text-center mb-20">
          <SectionHeader number="03" overline="CURATED SELECTIONS" heading="Find Your Perfect Property" align="center" />
        </div>
        <div className="container mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <CategoryTile key={cat.name} {...cat} i={i} />
          ))}
        </div>
      </section>

      {/* 7. FLOOR PLANS PREVIEW */}
      <section className="py-40 bg-dark-primary overflow-hidden">
        <div className="container mx-auto px-8">
          <SectionHeader overline="INTERACTIVE PLANS" heading="Thoughtfully Designed Spaces" align="center" subtext="Every square inch is optimized for cinematic living and maximum functionality." />
          
          <div className="mt-20 flex justify-center gap-10 border-b border-dark-border mb-20">
            {floorPlans.map((plan, i) => (
              <button
                key={i}
                onClick={() => setActivePlan(i)}
                className={`pb-6 text-xs uppercase tracking-[0.3em] font-bold transition-all relative ${activePlan === i ? 'text-gold-primary' : 'text-white/30 hover:text-white'}`}
              >
                {plan.name.split(' ')[0]}
                {activePlan === i && (
                  <motion.div layoutId="plan-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 p-12 relative"
              >
                <img src={floorPlans[activePlan].image} alt="Plan" className="w-full h-auto grayscale invert brightness-100 opacity-80" />
                <div className="absolute top-0 left-0 w-full h-full border border-gold-primary/10 pointer-events-none" />
                <div className="absolute -top-4 -left-4 text-gold-primary/20 font-display italic text-6xl">Plan.</div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode='wait'>
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-4xl font-display font-bold text-white mb-8">{floorPlans[activePlan].name}</h3>
                <div className="grid grid-cols-2 gap-10 mb-12">
                  <div><p className="text-[10px] text-muted uppercase tracking-widest mb-2">Carpet Area</p><p className="text-2xl font-display text-gold-primary">{floorPlans[activePlan].carpet}</p></div>
                  <div><p className="text-[10px] text-muted uppercase tracking-widest mb-2">Built-up Area</p><p className="text-2xl font-display text-offWhite">{floorPlans[activePlan].built}</p></div>
                </div>
                <ul className="grid grid-cols-2 gap-6 mb-16">
                  {floorPlans[activePlan].features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 bg-gold-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-6">
                  <button className="premium-btn-filled flex-1">Download PDF</button>
                  <button className="premium-btn-outline flex-1">Enquire Now</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. VIDEO WALKTHROUGH */}
      <section className="py-40 relative">
        <div className="container mx-auto px-8">
          <div className="relative group overflow-hidden border border-dark-border">
            <img src="https://picsum.photos/id/126/1920/1080" className="w-full aspect-video object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-1000" alt="" />
            <div className="absolute inset-0 bg-dark-primary/60" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="overline-text text-white/40 mb-6">Experience the Space</p>
              <button onClick={() => setIsVideoModalOpen(true)} className="w-24 h-24 rounded-full border-2 border-gold-primary flex items-center justify-center group-hover:bg-gold-primary transition-all duration-500 mb-8">
                <Play className="text-gold-primary group-hover:text-dark-primary ml-2 transition-colors" size={32} fill="currentColor" />
              </button>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">Virtual Tour 2024</h3>
            </div>
            
            <div className="absolute bottom-12 left-12 flex gap-12">
               <div className="flex flex-col"><span className="text-gold-primary font-bold">360°</span><span className="text-[9px] uppercase tracking-widest text-white/40">Perspective</span></div>
               <div className="flex flex-col"><span className="text-gold-primary font-bold">8K</span><span className="text-[9px] uppercase tracking-widest text-white/40">Clarity</span></div>
               <div className="flex flex-col"><span className="text-gold-primary font-bold">LIVE</span><span className="text-[9px] uppercase tracking-widest text-white/40">Support</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS CAROUSEL */}
      <section className="py-40 bg-dark-secondary overflow-hidden">
        <div className="container mx-auto px-8 relative">
          <Quote className="absolute -top-10 left-0 text-gold-primary opacity-10 w-40 h-40 -z-0" />
          <div className="relative z-10">
            <SectionHeader overline="TESTIMONIALS" heading="Words From Our Families" align="center" />
            
            <div className="max-w-4xl mx-auto mt-20 text-center">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-10"
                >
                  <p className="text-3xl md:text-4xl font-display italic text-offWhite leading-relaxed">
                    "{DUMMY_TESTIMONIALS[activeTestimonial].quote}"
                  </p>
                  <div className="flex justify-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-gold-primary" fill="currentColor" />)}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gold-primary/20 flex items-center justify-center text-gold-primary font-bold text-xl mb-6 border border-gold-primary/30">
                      {DUMMY_TESTIMONIALS[activeTestimonial].avatar_initials}
                    </div>
                    <h5 className="text-lg font-bold text-white">{DUMMY_TESTIMONIALS[activeTestimonial].name}</h5>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">{DUMMY_TESTIMONIALS[activeTestimonial].designation} · {DUMMY_TESTIMONIALS[activeTestimonial].project_name}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-8 mt-16">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === 0 ? DUMMY_TESTIMONIALS.length - 1 : prev - 1))}
                  className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-white/40 hover:text-gold-primary hover:border-gold-primary transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                   {DUMMY_TESTIMONIALS.map((_, i) => (
                     <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === i ? 'bg-gold-primary w-8' : 'bg-dark-border'}`} />
                   ))}
                </div>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev === DUMMY_TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                  className="w-12 h-12 rounded-full border border-dark-border flex items-center justify-center text-white/40 hover:text-gold-primary hover:border-gold-primary transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHY CHOOSE US */}
      <section className="flex flex-col lg:flex-row min-h-[700px] border-y border-dark-border">
        <div className="lg:w-1/2 bg-dark-primary p-12 md:p-24 flex flex-col justify-center">
          <SectionHeader 
            overline="THE AURUM DIFFERENCE" 
            heading="18 Years of Excellence, One Promise at a Time"
            subtext="We believe luxury is in the details. From RERA compliance to on-time delivery, our track record is as solid as our foundations. Our commitment to quality is what makes us India's most trusted developer."
          />
          <div className="flex gap-16 mt-16 pt-16 border-t border-dark-border">
            {DUMMY_AWARDS.slice(0, 3).map((award, i) => (
              <div key={i} className="text-left">
                <p className="text-gold-primary font-display text-2xl mb-1">{award.year}</p>
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] max-w-[100px]">{award.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 bg-dark-secondary p-8 md:p-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { icon: <ShieldCheck className="text-gold-primary" size={32} />, title: 'RERA Certified', desc: 'Complete transparency in every square foot we build. All projects are registered.' },
            { icon: <Clock className="text-gold-primary" size={32} />, title: 'On-Time Delivery', desc: 'A record of 100% on-time project completions since our inception in 2006.' },
            { icon: <Gem className="text-gold-primary" size={32} />, title: 'Premium Materials', desc: 'Sourcing the finest marble, timber, and fittings from around the world.' },
            { icon: <HeadphonesIcon className="text-gold-primary" size={32} />, title: 'Lifetime Support', desc: 'Dedicated customer care even long after you have moved into your home.' }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="p-10 border border-dark-border bg-dark-primary/30 hover:bg-white/5 transition-all group"
            >
              <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</div>
              <h4 className="text-offWhite font-bold text-lg mb-3 tracking-wide">{item.title}</h4>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 11. TEAM SECTION */}
      <section className="py-40 bg-dark-primary">
        <div className="container mx-auto px-8">
          <SectionHeader number="04" overline="LEADERSHIP" heading="The Minds Behind the Vision" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-24">
            {DUMMY_TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden mb-8 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-all duration-500" />
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                     <div className="w-10 h-10 bg-gold-primary flex items-center justify-center text-dark-primary"><ArrowRight size={20} /></div>
                  </div>
                </div>
                <h4 className="text-2xl font-display font-bold text-white group-hover:text-gold-primary transition-colors">{member.name}</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold-primary mt-2 mb-4">{member.role}</p>
                <p className="text-muted text-xs leading-relaxed line-clamp-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CTA BANNER */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/id/125/1920/1080" className="w-full h-full object-cover grayscale opacity-15" alt="CTA" />
          <div className="absolute inset-0 bg-dark-primary/90" />
          {/* Architectural SVG Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L50 0 L100 100" fill="none" stroke="#C9A84C" strokeWidth="0.1" />
             <path d="M0 50 L100 50" fill="none" stroke="#C9A84C" strokeWidth="0.1" />
          </svg>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 text-center flex flex-col items-center">
          <p className="overline-text mb-8">START YOUR JOURNEY</p>
          <div className="flex items-center justify-center gap-10 mb-10">
            <div className="hidden md:block h-[1px] w-24 bg-gold-primary/40" />
            <h2 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] text-offWhite">Your Dream Home Is One <br/> Conversation Away</h2>
            <div className="hidden md:block h-[1px] w-24 bg-gold-primary/40" />
          </div>
          <p className="text-muted text-lg md:text-xl mb-16 max-w-2xl font-light">Connect with our luxury consultants for a private viewing of our signature estates across India.</p>
          <div className="flex flex-col sm:flex-row gap-8">
            <Link to="/contact" className="premium-btn-filled px-12 py-5 text-sm">Schedule Site Visit</Link>
            <a href={`tel:${DUMMY_SETTINGS.contact_phone}`} className="premium-btn-outline px-12 py-5 text-sm flex items-center gap-4">
              <Phone size={16} /> Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* 13. CONTACT STRIP */}
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

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-6 md:p-20"
          >
            <button onClick={() => setIsVideoModalOpen(false)} className="absolute top-10 right-10 text-white hover:text-gold-primary transition-colors">
              <X size={40} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-6xl aspect-video bg-black shadow-2xl relative"
            >
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Walkthrough Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
