import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '../SectionHeader'
import { DUMMY_TEAM } from '../../data/dummyData'

const TeamSection = () => {
  return (
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
  )
}

export default TeamSection
