import React, { useState } from 'react'

// Home Components
import HeroBanner from '../components/home/HeroBanner'
import CompanyIntro from '../components/home/CompanyIntro'
import MarqueeTicker from '../components/home/MarqueeTicker'
import AboutIntro from '../components/home/AboutIntro'
import FeaturedProjects from '../components/home/FeaturedProjects'
import PropertyCategories from '../components/home/PropertyCategories'
import FloorPlans from '../components/home/FloorPlans'
import VideoWalkthrough from '../components/home/VideoWalkthrough'
import TestimonialsCarousel from '../components/home/TestimonialsCarousel'
import TrustSection from '../components/home/TrustSection'
import TeamSection from '../components/home/TeamSection'
import CTABanner from '../components/home/CTABanner'
import ContactStrip from '../components/home/ContactStrip'
import VideoModal from '../components/home/VideoModal'

const Home = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  return (
    <div className="bg-dark-primary overflow-x-hidden">
      <HeroBanner />
      <CompanyIntro setIsVideoModalOpen={setIsVideoModalOpen} />
      <MarqueeTicker />
      <AboutIntro />
      <FeaturedProjects />
      <PropertyCategories />
      <FloorPlans />
      <VideoWalkthrough setIsVideoModalOpen={setIsVideoModalOpen} />
      <TestimonialsCarousel />
      <TrustSection />
      <TeamSection />
      <CTABanner />
      <ContactStrip />
      <VideoModal isVideoModalOpen={isVideoModalOpen} setIsVideoModalOpen={setIsVideoModalOpen} />
    </div>
  )
}

export default Home
