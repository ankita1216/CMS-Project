import React from 'react'
import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import SectionHeader from '../components/SectionHeader'
import { DUMMY_TEAM, DUMMY_AWARDS } from '../data/dummyData'
import { Trophy } from 'lucide-react'

const About = () => {
  const milestones = [
    { year: '2006', title: 'The Genesis', desc: 'Aurum Estates was founded with a vision to revolutionize the luxury housing market in Mumbai.' },
    { year: '2009', title: 'Expansion Phase', desc: 'Successfully launched our first major township project, delivering 500+ homes.' },
    { year: '2012', title: 'Award Recognition', desc: 'Voted "Best Emerging Developer" at the National Realty Summit.' },
    { year: '2015', title: 'Sustainable Future', desc: 'Adopted green building practices across all new developments.' },
    { year: '2019', title: 'Pan-India Presence', desc: 'Expanded operations to Hyderabad, Bangalore, and Gurgaon.' },
    { year: '2024', title: 'Digital Transformation', desc: 'Launching our premium CMS platform for seamless client engagement.' }
  ]

  return (
    <div className="pt-20">
      <SEOHead title="Our Story" description="Learn about the legacy of Aurum Estates." />

      {/* HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/id/129/1920/1080" className="w-full h-full object-cover grayscale opacity-30" alt="" />
          <div className="absolute inset-0 bg-dark-primary/60" />
        </div>
        <div className="relative z-10 text-center">
          <SectionHeader overline="THE LEGACY" heading="Our Story" align="center" />
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-32 container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="overline-text mb-4">OUR VISION</p>
            <h2 className="text-4xl font-display font-bold mb-8">To redefine the meaning <br/> of home in India</h2>
            <p className="text-muted leading-relaxed mb-6">
              We don't just build walls; we craft canvases where legacies are painted. Our vision is to be the benchmark of excellence in architectural design and customer service.
            </p>
            <p className="text-muted leading-relaxed">
              Every Aurum property is a testament to our commitment to quality, aesthetics, and the timeless joy of living.
            </p>
          </div>
          <div className="bg-dark-secondary p-12 border-l-4 border-gold-primary">
            <h3 className="text-gold-primary font-display text-2xl mb-6">Our Mission</h3>
            <p className="text-2xl font-display italic text-offWhite leading-relaxed mb-10">
              "To create world-class living spaces that blend modern luxury with sustainable practices, ensuring value for generations."
            </p>
            <ul className="space-y-4">
              {['Excellence in Design', 'Uncompromising Quality', 'Customer First Approach'].map((val, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 bg-gold-primary" />
                  <span className="text-sm uppercase tracking-widest text-white/70">{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-32 bg-dark-secondary overflow-hidden">
        <div className="container mx-auto px-8">
          <SectionHeader overline="MILESTONES" heading="18 Years of Excellence" align="center" />
          
          <div className="relative mt-20">
            {/* Center Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-gold-primary/20 hidden md:block" />
            
            <div className="space-y-20">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2" />
                  {/* Dot */}
                  <div className="w-10 h-10 rounded-full border border-gold-primary bg-dark-primary z-10 flex items-center justify-center mb-8 md:mb-0">
                    <div className="w-2 h-2 bg-gold-primary rounded-full" />
                  </div>
                  <div className={`md:w-1/2 px-10 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h4 className="text-gold-primary font-display text-4xl mb-2">{m.year}</h4>
                    <h5 className="text-xl font-bold text-offWhite mb-4">{m.title}</h5>
                    <p className="text-muted text-sm leading-relaxed max-w-md mx-auto md:mx-0">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <SectionHeader overline="LEADERSHIP" heading="Meet Our Visionaries" align="center" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16">
            {DUMMY_TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden mb-6 relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gold-primary/0 group-hover:bg-gold-primary/10 transition-all duration-500" />
                </div>
                <h4 className="text-xl font-display font-bold text-white group-hover:text-gold-primary transition-colors">{member.name}</h4>
                <p className="overline-text text-[9px] mb-4">{member.role}</p>
                <p className="text-muted text-xs leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {member.bio}
                </p>
                <div className="mt-4 pt-4 border-t border-dark-border grid grid-cols-2 gap-4">
                   <div><p className="text-gold-primary text-sm font-bold">{member.experience_years}y</p><p className="text-[8px] uppercase text-muted">Exp</p></div>
                   <div><p className="text-gold-primary text-sm font-bold">{member.deals_closed}+</p><p className="text-[8px] uppercase text-muted">Deals</p></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-32 bg-dark-secondary">
        <div className="container mx-auto px-8">
          <SectionHeader overline="RECOGNITION" heading="Industry Awards" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {DUMMY_AWARDS.map((award, i) => (
              <div key={i} className="p-10 bg-dark-primary border border-dark-border group hover:border-gold-primary transition-colors">
                <p className="text-gold-primary font-display text-2xl mb-4">{award.year}</p>
                <Trophy size={32} className="text-white/20 mb-6 group-hover:text-gold-primary transition-colors" />
                <h4 className="text-lg font-bold text-offWhite mb-2">{award.title}</h4>
                <p className="text-[10px] uppercase tracking-widest text-muted mb-4">{award.organization}</p>
                <p className="text-muted text-xs leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
